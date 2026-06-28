import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { eventBus } from "@/lib/event-bus";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { AuditService } from "@/modules/audit/audit.service";
import { cacheService } from "@/lib/cache";

const profileUpdateSchema = z.object({
  name: z.string().min(2, "Name is required").optional(),
  companyName: z.string().min(2, "Company Name is required").optional(),
  contactPhone: z.string().min(6, "Phone is required").optional(),
  industry: z.string().min(2, "Industry is required").optional(),
  country: z.string().min(2, "Country is required").optional(),
  state: z.string().min(2, "State is required").optional(),
  city: z.string().min(2, "City is required").optional(),
  address: z.string().optional().nullable(),
  gstNumber: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  linkedIn: z.string().optional().nullable(),
  pinCode: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  
  // Geolocation
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  locationSource: z.enum(["MANUAL", "GEOLOCATION", "IP"]).optional(),
}).strict();

// GET customer profile, location, and activities (timeline)
export const GET = secureRoute(
  { action: "get_customer_profile", rateLimitLimit: 50 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const customer = await db.customer.findUnique({
        where: { userId: session.user.id },
        include: {
          location: true,
          activities: {
            orderBy: { timestamp: "desc" },
          },
          inquiries: {
            orderBy: { createdAt: "desc" },
          },
        },
      });

      if (!customer) {
        return NextResponse.json({ error: "Customer profile not found" }, { status: 404 });
      }

      // Filter out adminNotes for security (internal notes only visible to ADMIN)
      const { adminNotes, ...safeCustomer } = customer;

      return NextResponse.json(safeCustomer);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
);

// PATCH customer profile
export const PATCH = secureRoute(
  { action: "update_customer_profile", rateLimitLimit: 30 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const customer = await db.customer.findUnique({
        where: { userId: session.user.id },
        include: { location: true },
      });

      if (!customer) {
        return NextResponse.json({ error: "Customer profile not found" }, { status: 404 });
      }

      const body = await req.json();
      const parsed = profileUpdateSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Validation failed", details: parsed.error.format() },
          { status: 400 }
        );
      }

      const data = parsed.data;

      // Update in transaction
      const updatedCustomer = await db.$transaction(async (tx: Prisma.TransactionClient) => {
        // 1. Update User name if provided
        if (data.name) {
          await tx.user.update({
            where: { id: session.user.id },
            data: { name: data.name },
          });
        }

        // 2. Update Customer details
        const updated = await tx.customer.update({
          where: { id: customer.id },
          data: {
            name: data.name,
            companyName: data.companyName,
            contactPhone: data.contactPhone,
            industry: data.industry,
            country: data.country,
            state: data.state,
            city: data.city,
            address: data.address === undefined ? undefined : (data.address || null),
            gstNumber: data.gstNumber === undefined ? undefined : (data.gstNumber || null),
            website: data.website === undefined ? undefined : (data.website || null),
            linkedIn: data.linkedIn === undefined ? undefined : (data.linkedIn || null),
            pinCode: data.pinCode === undefined ? undefined : (data.pinCode || null),
            notes: data.notes === undefined ? undefined : (data.notes || null),
          },
        });

        // 3. Update Location if supplied
        if (data.latitude !== undefined || data.longitude !== undefined || data.country || data.state || data.city) {
          const lat = data.latitude !== undefined ? data.latitude : (customer.location?.latitude || null);
          const lon = data.longitude !== undefined ? data.longitude : (customer.location?.longitude || null);
          const source = data.locationSource || customer.location?.source || "MANUAL";
          const country = data.country || customer.location?.country || updated.country;
          const state = data.state || customer.location?.state || updated.state;
          const city = data.city || customer.location?.city || updated.city;

          await tx.customerLocation.upsert({
            where: { customerId: customer.id },
            update: {
              latitude: lat,
              longitude: lon,
              source,
              country,
              state,
              city,
            },
            create: {
              customerId: customer.id,
              latitude: lat,
              longitude: lon,
              source,
              country,
              state,
              city,
            },
          });
        }

        return updated;
      });

      // Emit profile updated event
      eventBus.emit("profile.updated", {
        customerId: customer.id,
        updaterId: session.user.id,
      });

      // Write audit log
      await AuditService.logChange({
        userId: session.user.id,
        action: "UPDATE",
        entityName: "Customer",
        entityId: customer.id,
        oldValues: customer,
        newValues: updatedCustomer,
        reason: "Customer self-update of profile",
      });

      await cacheService.del("admin_analytics");

      return NextResponse.json(updatedCustomer);

    } catch (error: any) {
      console.error("Profile update error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to update profile" },
        { status: 500 }
      );
    }
  }
);

import { NextRequest, NextResponse, secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { eventBus } from "@/lib/event-bus";
import { Prisma, UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { z } from "zod";
import { geocodeIp } from "@/lib/geocoder";
import { AuditService } from "@/modules/audit/audit.service";
import { cacheService } from "@/lib/cache";

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  companyName: z.string().min(2, "Company Name is required"),
  email: z.string().email("Invalid email address"),
  contactPhone: z.string().min(6, "Phone number is required"),
  industry: z.string().min(2, "Industry is required"),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  
  // Optional fields
  address: z.string().optional().nullable(),
  gstNumber: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  linkedIn: z.string().optional().nullable(),
  pinCode: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  
  // Optional location metrics
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  locationSource: z.enum(["MANUAL", "GEOLOCATION", "IP"]).optional().default("MANUAL"),
});

export const POST = secureRoute(
  { action: "register_customer", rateLimitLimit: 10 },
  async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const {
      name,
      companyName,
      email,
      contactPhone,
      industry,
      country,
      state,
      city,
      password,
      address,
      gstNumber,
      website,
      linkedIn,
      pinCode,
      notes,
      latitude,
      longitude,
      locationSource,
    } = parsed.data;

    // 1. Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 400 }
      );
    }

    // 2. Hash Password
    const passwordHash = await bcrypt.hash(password, 10);

    // 3. Create User & Customer Profile in transaction
    const result = await db.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create User
      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: UserRole.CUSTOMER,
        },
      });

      // Create Customer profile
      const customer = await tx.customer.create({
        data: {
          userId: user.id,
          name,
          email,
          companyName,
          contactPhone,
          industry,
          country,
          state,
          city,
          address: address || null,
          gstNumber: gstNumber || null,
          website: website || null,
          linkedIn: linkedIn || null,
          pinCode: pinCode || null,
          notes: notes || null,
        },
      });

      // Create Lead record
      const lead = await tx.lead.create({
        data: {
          name,
          companyName,
          email,
          phone: contactPhone,
          industry,
          country,
          state,
          city,
          status: "NEW",
        },
      });

      // Create Customer Registered Activity
      const activity = await tx.customerActivity.create({
        data: {
          customerId: customer.id,
          activityType: "REGISTERED",
          description: `Account registered successfully for ${companyName} (${industry}).`,
        },
      });

      return { user, customer, lead, activity };
    });

    // 4. Geolocation mapping (outside transaction to avoid blocking it for external calls)
    let finalLat = latitude || null;
    let finalLon = longitude || null;
    let finalSource = locationSource;
    let finalCountry = country;
    let finalState = state;
    let finalCity = city;

    // Fallback to IP location if lat/lon not provided and source is not GEOLOCATION
    if (!finalLat || !finalLon) {
      const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
      const ip = ipHeader.split(",")[0];
      const geo = await geocodeIp(ip);
      
      if (geo.latitude && geo.longitude) {
        finalLat = geo.latitude;
        finalLon = geo.longitude;
        finalSource = "IP";
        // Only override if client manually typed "Unknown" or blank
        if (!finalCountry || finalCountry.toLowerCase() === "unknown") finalCountry = geo.country;
        if (!finalState || finalState.toLowerCase() === "unknown") finalState = geo.state;
        if (!finalCity || finalCity.toLowerCase() === "unknown") finalCity = geo.city;
      }
    }

    // Save location mapping
    await db.customerLocation.create({
      data: {
        customerId: result.customer.id,
        latitude: finalLat,
        longitude: finalLon,
        country: finalCountry,
        state: finalState,
        city: finalCity,
        source: finalSource,
      },
    });

    // 5. Emit registration event to notify Admin
    eventBus.emit("user.registered", {
      userId: result.user.id,
      customerId: result.customer.id,
      name,
      email,
      companyName,
      industry,
      country: finalCountry,
      state: finalState,
      city: finalCity,
      phone: contactPhone,
    });

    // Log to audit log
    await AuditService.logChange({
      userId: result.user.id,
      action: "REGISTER",
      entityName: "Customer",
      entityId: result.customer.id,
      oldValues: null,
      newValues: { id: result.customer.id, email, companyName },
      reason: "Customer self-registration",
    });

    // Invalidate analytics cache
    await cacheService.del("admin_analytics");

    return NextResponse.json({
      success: true,
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during registration" },
      { status: 500 }
    );
  }
});

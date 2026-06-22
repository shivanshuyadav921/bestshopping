import { eventBus } from "@/lib/event-bus";
import { EmailService } from "./email.service";
import { db } from "@/lib/db";

let initialized = false;

export function initializeListeners() {
  if (initialized) return;
  initialized = true;

  console.log("Initializing Event Bus Listeners...");

  // 1. RFQ Created
  eventBus.on("rfq.created", async (data: { rfqId: string; description: string; customerId: string }) => {
    try {
      const customer = await db.customer.findUnique({
        where: { id: data.customerId },
        include: { user: true },
      });
      if (!customer) return;

      // Log DB Notification for Customer
      await db.notification.create({
        data: {
          userId: customer.userId,
          title: "RFQ Submitted Successfully",
          message: `Your RFQ #${data.rfqId.substring(0, 8)} has been received and is under engineering review.`,
        },
      });

      // Send Email
      await EmailService.sendRfqReceived(customer.user.email, customer.user.name || "Customer", data.rfqId, data.description);
    } catch (error) {
      console.error("Error in rfq.created event listener:", error);
    }
  });

  // 2. Order Updated
  eventBus.on("order.updated", async (data: { orderId: string; oldStatus: string; newStatus: string; customerId: string }) => {
    try {
      const customer = await db.customer.findUnique({
        where: { id: data.customerId },
        include: { user: true },
      });
      if (!customer) return;

      // Log DB Notification
      await db.notification.create({
        data: {
          userId: customer.userId,
          title: `Order Status Updated: #${data.orderId.substring(0, 8)}`,
          message: `Your order status changed from ${data.oldStatus} to ${data.newStatus}.`,
        },
      });

      // Send Email
      await EmailService.sendOrderStatusUpdated(customer.user.email, data.orderId, data.oldStatus, data.newStatus);
    } catch (error) {
      console.error("Error in order.updated event listener:", error);
    }
  });

  // 3. Inspection Completed
  eventBus.on("inspection.completed", async (data: { orderId: string; status: string; notes?: string; customerId: string }) => {
    try {
      const customer = await db.customer.findUnique({
        where: { id: data.customerId },
        include: { user: true },
      });
      if (!customer) return;

      // Log DB Notification
      await db.notification.create({
        data: {
          userId: customer.userId,
          title: `Inspection Complete: #${data.orderId.substring(0, 8)}`,
          message: `Quality inspection report is ready. Result: ${data.status}.`,
        },
      });

      // Send Email
      await EmailService.sendInspectionComplete(customer.user.email, data.orderId, data.status, data.notes);
    } catch (error) {
      console.error("Error in inspection.completed event listener:", error);
    }
  });

  // 4. Dispatch Completed
  eventBus.on("order.dispatched", async (data: { orderId: string; trackingNumber?: string; customerId: string }) => {
    try {
      const customer = await db.customer.findUnique({
        where: { id: data.customerId },
        include: { user: true },
      });
      if (!customer) return;

      // Log DB Notification
      await db.notification.create({
        data: {
          userId: customer.userId,
          title: `Order Dispatched: #${data.orderId.substring(0, 8)}`,
          message: `Your components have been shipped. Courier Tracking: ${data.trackingNumber || "PRM-SHP-TRACK-01"}.`,
        },
      });

      // Send Email
      await EmailService.sendDispatchComplete(customer.user.email, data.orderId, data.trackingNumber);
    } catch (error) {
      console.error("Error in order.dispatched event listener:", error);
    }
  });

  // 5. Urgent Breakdown
  eventBus.on("breakdown.alert", async (data: { customerName: string; customerEmail: string; details: string }) => {
    try {
      await EmailService.sendUrgentBreakdown(data.customerName, data.customerEmail, data.details);
    } catch (error) {
      console.error("Error in breakdown.alert event listener:", error);
    }
  });
}

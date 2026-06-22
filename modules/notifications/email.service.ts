import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "re_mock_12345";
const resend = new Resend(resendApiKey.startsWith("re_mock") ? "re_123456" : resendApiKey);

const EMAIL_FROM = process.env.EMAIL_FROM || "PREMA <noreply@prema-manufacturing.com>";
const OWNER_EMAIL = process.env.NOTIFICATION_RECEIVER_EMAIL || "owner@prema-manufacturing.com";

export class EmailService {
  private static isMock = resendApiKey.startsWith("re_mock");

  private static async sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
    if (this.isMock) {
      console.log(`[MOCK EMAIL] To: ${to} | Subject: ${subject}`);
      console.log(`[MOCK EMAIL BODY]\n${html.replace(/<[^>]*>/g, " ").trim().substring(0, 300)}...\n`);
      return { success: true, id: "mock_id" };
    }

    try {
      const response = await resend.emails.send({
        from: EMAIL_FROM,
        to,
        subject,
        html,
      });
      return { success: true, id: response.data?.id };
    } catch (error) {
      console.error("Error sending email via Resend:", error);
      return { success: false, error };
    }
  }

  /**
   * RFQ Received
   */
  static async sendRfqReceived(customerEmail: string, customerName: string, rfqId: string, description: string) {
    const subject = `PREMA - RFQ Received: #${rfqId.substring(0, 8)}`;
    const html = `
      <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">RFQ Received Successfully</h2>
        <p>Dear <strong>${customerName}</strong>,</p>
        <p>Thank you for submitting your Request for Quote (RFQ) to PREMA. Our engineering team is currently reviewing your technical specifications.</p>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 4px; margin: 15px 0;">
          <p style="margin: 5px 0;"><strong>RFQ ID:</strong> ${rfqId}</p>
          <p style="margin: 5px 0;"><strong>Description:</strong> ${description}</p>
        </div>
        <p>We will provide a formal quotation shortly. If you uploaded STEP or CAD files, our estimators are running tool-path calculations now.</p>
        <p style="color: #64748b; font-size: 12px; margin-top: 30px;">PREMA Advanced Manufacturing & Engineering Services</p>
      </div>
    `;

    // 1. Send to Customer
    await this.sendEmail({ to: customerEmail, subject, html });

    // 2. Alert Owner Immediately
    const ownerSubject = `[URGENT OWNER ALERT] New RFQ Submitted - #${rfqId.substring(0, 8)}`;
    const ownerHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 2px solid #ef4444; border-radius: 5px;">
        <h2 style="color: #ef4444;">New RFQ Pending Engineering Review</h2>
        <p>A new request for quotation has been submitted by <strong>${customerName}</strong> (${customerEmail}).</p>
        <div style="background-color: #fef2f2; padding: 15px; border-left: 4px solid #ef4444; margin: 15px 0;">
          <p><strong>RFQ ID:</strong> ${rfqId}</p>
          <p><strong>Details:</strong> ${description}</p>
        </div>
        <p><a href="${process.env.NEXTAUTH_URL}/admin/rfqs/${rfqId}" style="background-color: #ef4444; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block;">Open Dashboard to Review</a></p>
      </div>
    `;
    await this.sendEmail({ to: OWNER_EMAIL, subject: ownerSubject, html: ownerHtml });
  }

  /**
   * Order Status Updated
   */
  static async sendOrderStatusUpdated(customerEmail: string, orderId: string, oldStatus: string, newStatus: string) {
    const subject = `PREMA - Order Status Update: #${orderId.substring(0, 8)}`;
    const html = `
      <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 10px;">Order Progress Notification</h2>
        <p>Your order status has changed:</p>
        <div style="display: flex; align-items: center; justify-content: space-around; margin: 20px 0; background: #f0fdf4; padding: 15px; border-radius: 4px;">
          <span style="color: #64748b; text-decoration: line-through;">${oldStatus}</span>
          <span style="font-weight: bold; color: #166534; font-size: 18px;">&rarr; ${newStatus}</span>
        </div>
        <p>Order Reference ID: <code>${orderId}</code></p>
        <p>Log in to the PREMA Customer Portal to track live machine logs and inspection documents.</p>
        <p style="color: #64748b; font-size: 12px; margin-top: 30px;">PREMA Manufacturing Ops</p>
      </div>
    `;
    await this.sendEmail({ to: customerEmail, subject, html });
  }

  /**
   * Inspection Complete
   */
  static async sendInspectionComplete(customerEmail: string, orderId: string, status: string, notes?: string) {
    const subject = `PREMA - Quality Inspection Complete: #${orderId.substring(0, 8)}`;
    const color = status === "PASSED" ? "#10b981" : "#f59e0b";
    const html = `
      <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px;">
        <h2 style="color: #0f172a; border-bottom: 2px solid ${color};">Quality Inspection Finished</h2>
        <p>Inspection reports are now available for Order <code>${orderId}</code>.</p>
        <div style="padding: 15px; border-radius: 4px; background-color: ${status === "PASSED" ? "#ecfdf5" : "#fffbeb"};">
          <p><strong>Result:</strong> <span style="font-weight: bold; color: ${color};">${status}</span></p>
          <p><strong>Notes:</strong> ${notes || "Passed dimensional accuracy check (GD&T)."}</p>
        </div>
        <p>You can download the inspection sheets and certificates from your dashboard files tab.</p>
      </div>
    `;
    await this.sendEmail({ to: customerEmail, subject, html });
  }

  /**
   * Dispatch Complete
   */
  static async sendDispatchComplete(customerEmail: string, orderId: string, trackingNumber?: string) {
    const subject = `PREMA - Order Dispatched: #${orderId.substring(0, 8)}`;
    const html = `
      <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #3b82f6;">Shipment On Its Way!</h2>
        <p>Parts for order <code>${orderId}</code> have been dispatched.</p>
        <p><strong>Courier tracking ID:</strong> <code>${trackingNumber || "PRM-SHP-TRACK-01"}</code></p>
        <p>Please inspect the components upon delivery to ensure compliance with surface roughness (Ra) and tolerance specs.</p>
      </div>
    `;
    await this.sendEmail({ to: customerEmail, subject, html });
  }

  /**
   * Urgent Breakdown Request
   */
  static async sendUrgentBreakdown(customerName: string, customerEmail: string, details: string) {
    const subject = `[CRITICAL BREAKDOWN ALERT] Urgent Production Request from ${customerName}`;
    const html = `
      <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 3px double #ef4444;">
        <h1 style="color: #b91c1c; margin-top: 0;">⚠️ URGENT PRODUCTION BREAKDOWN</h1>
        <p>A customer is reporting a production line shutdown / breakdown request.</p>
        <p><strong>Contact:</strong> ${customerName} (${customerEmail})</p>
        <div style="background-color: #fef2f2; border-left: 5px solid #b91c1c; padding: 15px; margin: 15px 0;">
          <p><strong>Request Details:</strong></p>
          <p style="white-space: pre-wrap;">${details}</p>
        </div>
        <p>This email was triggered instantly because a breakdown status flag was raised. Contact client immediately to align tooling schedules.</p>
      </div>
    `;
    await this.sendEmail({ to: OWNER_EMAIL, subject, html });
  }
}

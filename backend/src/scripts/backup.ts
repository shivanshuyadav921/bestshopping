import { db } from "@/lib/db";
import fs from "fs";
import path from "path";

/**
 * Enterprise Database Backup Utility.
 * Programmatically serializes all relational data models to a local JSON dump
 * to guarantee successful backup execution across development, staging, or serverless environments.
 */
export async function runBackupProgrammatic(): Promise<{ success: boolean; filename?: string; error?: string }> {
  const backupsDir = path.join(process.cwd(), "backups");
  if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `prema-backup-${timestamp}.json`;
  const backupPath = path.join(backupsDir, filename);

  try {
    console.log(`[Backup Engine] Starting programmatic database backup...`);

    const [
      users,
      customers,
      locations,
      activities,
      leads,
      inquiries,
      rfqs,
      orders,
      orderUpdates,
      notifications,
      auditLogs,
      materials,
      heatTreatments,
      surfaceFinishes,
      fits,
      tolerances,
      threadStandards,
      bearings,
      gearData,
      inspectionRecords,
      certificates,
      uploadedFiles,
      machines,
      jobs,
      componentQuotes,
      backgroundJobs
    ] = await Promise.all([
      db.user.findMany(),
      db.customer.findMany(),
      db.customerLocation.findMany(),
      db.customerActivity.findMany(),
      db.lead.findMany(),
      db.inquiry.findMany(),
      db.rFQ.findMany(),
      db.order.findMany(),
      db.orderUpdate.findMany(),
      db.notification.findMany(),
      db.auditLog.findMany(),
      db.material.findMany(),
      db.heatTreatment.findMany(),
      db.surfaceFinish.findMany(),
      db.fit.findMany(),
      db.tolerance.findMany(),
      db.threadStandard.findMany(),
      db.bearing.findMany(),
      db.gearData.findMany(),
      db.inspectionRecord.findMany(),
      db.certificate.findMany(),
      db.uploadedFile.findMany(),
      db.machine.findMany(),
      db.job.findMany(),
      db.componentQuote.findMany(),
      db.backgroundJob.findMany()
    ]);

    const backupPayload = {
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      data: {
        users,
        customers,
        locations,
        activities,
        leads,
        inquiries,
        rfqs,
        orders,
        orderUpdates,
        notifications,
        auditLogs,
        materials,
        heatTreatments,
        surfaceFinishes,
        fits,
        tolerances,
        threadStandards,
        bearings,
        gearData,
        inspectionRecords,
        certificates,
        uploadedFiles,
        machines,
        jobs,
        componentQuotes,
        backgroundJobs
      }
    };

    fs.writeFileSync(backupPath, JSON.stringify(backupPayload, null, 2), "utf8");
    console.log(`[Backup Engine] Database backup written successfully to: ${backupPath}`);
    return { success: true, filename };
  } catch (error: any) {
    console.error(`[Backup Engine] Programmatic database backup exception:`, error);
    return { success: false, error: error.message || String(error) };
  }
}

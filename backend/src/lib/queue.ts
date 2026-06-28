import { db } from "./db";

export class QueueService {
  static async retryJob(jobId: string): Promise<boolean> {
    try {
      const job = await db.backgroundJob.findUnique({ where: { id: jobId } });
      if (!job) return false;
      await db.backgroundJob.update({
        where: { id: jobId },
        data: {
          status: "PENDING",
          attempts: 0,
          lastError: null,
          runAt: new Date()
        }
      });
      return true;
    } catch (e) {
      console.error("retryJob error:", e);
      return false;
    }
  }

  static async deleteJob(jobId: string): Promise<boolean> {
    try {
      await db.backgroundJob.delete({ where: { id: jobId } });
      return true;
    } catch (e) {
      console.error("deleteJob error:", e);
      return false;
    }
  }

  static async getMetrics(): Promise<any> {
    try {
      const [total, pending, processing, completed, failed] = await Promise.all([
        db.backgroundJob.count(),
        db.backgroundJob.count({ where: { status: "PENDING" } }),
        db.backgroundJob.count({ where: { status: "PROCESSING" } }),
        db.backgroundJob.count({ where: { status: "COMPLETED" } }),
        db.backgroundJob.count({ where: { status: "FAILED" } }),
      ]);
      return {
        total,
        pending,
        processing,
        completed,
        failed,
      };
    } catch (e) {
      console.error("getMetrics error:", e);
      return {
        total: 0,
        pending: 0,
        processing: 0,
        completed: 0,
        failed: 0,
      };
    }
  }
}

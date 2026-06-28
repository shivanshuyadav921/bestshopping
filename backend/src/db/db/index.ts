import { PrismaClient } from "@prisma/client";
import { initializeListeners } from "@/modules/notifications/notification.listeners";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// Automatically register Event Bus listeners on startup
initializeListeners();

export default db;

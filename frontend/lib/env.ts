import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(16),
  NEXTAUTH_URL: z.string().url().optional(),
  RESEND_API_KEY: z.string().min(5),
  EMAIL_FROM: z.string().optional(),
  NOTIFICATION_RECEIVER_EMAIL: z.string().email().optional(),
});

export const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.warn("⚠️ Environment variables validation failed:");
  console.warn(JSON.stringify(env.error.format(), null, 2));
}

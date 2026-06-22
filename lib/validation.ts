import { z } from "zod";

export const paginationQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(10),
  cursor: z.string().uuid().optional(),
  page: z.coerce.number().min(1).optional(),
});

export const idParamSchema = z.object({
  id: z.string().uuid(),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

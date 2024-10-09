import { z } from "zod";

export const postSchema = z.object({
  userId: z.number().min(1),
  id: z.number().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
});

export type PostType = z.infer<typeof postSchema>;

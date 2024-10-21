import { z } from "zod";

export const postSchema = z.object({
  userId: z.coerce.number().min(1),
  id: z.number().min(1).optional(),
  title: z.string().min(1, "title need to be longer"),
  body: z.string().min(3, "body needs more than 3 letter"),
});

export type PostType = z.infer<typeof postSchema>;

import { z } from "zod";
import { PostCreateInputSchema } from "@/prisma/generated/zod";
import { Prisma } from "@prisma/client";

export const postSchema = z.object({
  userId: z.coerce.number().min(1),
  id: z.number().min(1).optional(),
  title: z.string().min(1, "title need to be longer"),
  body: z.string().min(3, "body needs more than 3 letter"),
});

export type PostType = z.infer<typeof postSchema>;

export const PostCreateInputSchemaRefined = PostCreateInputSchema.refine(
  (data) => data.title.length < 3,
  { message: "title need to be longer", path: ["title"] },
).refine(
  (data) => data.body?.length ?? 0 < 3,
  "body needs more than 3 letter please",
);

export type PostWithUser = Prisma.PostGetPayload<{ include: { user: true } }>;

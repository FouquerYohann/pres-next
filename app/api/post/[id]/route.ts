import { NextResponse } from "next/server";
import { postSchema } from "@/app/post/type/PostType";
import { prisma } from "@/app/lib/prismaClient";

type Slug = { params: { id: string } };

export async function GET(_request: Request, { params }: Slug) {
  console.log(`fetch post ${params.id}`);
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(params.id) },
      include: { user: true },
    });
    return post
      ? NextResponse.json(post)
      : NextResponse.json({ message: "post not found" }, { status: 404 });
  } catch (_unused) {
    return NextResponse.json({ message: "post not found" }, { status: 404 });
  }
}

export async function PATCH(request: Request, { params }: Slug) {
  const body = await request.json();
  const safeParse = postSchema.partial().safeParse(body);
  if (!safeParse.success) {
    return NextResponse.json(
      {
        message: safeParse.error.message,
      },
      { status: 400 },
    );
  }

  try {
    const post = await prisma.post.update({
      where: { id: Number(params.id) },
      data: { body: safeParse.data.body, title: safeParse.data.title },
    });

    return post
      ? NextResponse.json("ok")
      : NextResponse.json({ message: "post not found" }, { status: 404 });
  } catch (_unused) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

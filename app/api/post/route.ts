import { postSchema } from "@/app/post/type/PostType";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prismaClient";
import { PostCreateInputSchema } from "@/prisma/generated/zod";

export async function GET() {
  const newVar = await prisma.post.findMany();
  if (!newVar) {
    return Response.json([]);
  }
  return Response.json(newVar);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = PostCreateInputSchema.safeParse(body);
  if (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Request body could not be read properly.",
      },
      { status: 400 },
    );
  }
  try {
    await prisma.post.create({
      data,
    });
    return NextResponse.json(
      { message: "post created successfully" },
      { status: 201 },
    );
  } catch (_unused) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const safeParse = postSchema.safeParse(body);
  if (!safeParse.success) {
    return NextResponse.json(
      {
        message: safeParse.error.message,
      },
      { status: 400 },
    );
  }
  const newPost = safeParse.data;

  try {
    await prisma.post.update({
      where: { id: newPost.id },
      data: { title: newPost.title, body: newPost.body },
    });
    return NextResponse.json({ message: "post updated" }, { status: 200 });
  } catch (_unused) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

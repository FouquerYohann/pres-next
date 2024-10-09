import { NextResponse } from "next/server";
import { readFromFile, writeToFile } from "@/app/api/post/readWrite";
import { postSchema } from "@/app/post/type/PostType";

type Slug = { params: { id: string } };

export async function GET(request: Request, { params }: Slug) {
  const postTypes = readFromFile();

  const postFound = postTypes.find((post) => post.id === parseInt(params.id));

  return postFound
    ? NextResponse.json(postFound)
    : NextResponse.json({ message: "post not found" }, { status: 404 });
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

  const partialPost = safeParse.data;
  const postTypes = readFromFile();
  const updatedPost = postTypes.map((post) =>
    post.id === parseInt(params.id) ? { ...post, ...partialPost } : post,
  );

  writeToFile(updatedPost);
  return NextResponse.json("ok");
}

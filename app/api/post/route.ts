import { postSchema } from "@/app/post/type/PostType";
import { NextResponse } from "next/server";
import { readFromFile, writeToFile } from "@/app/api/post/readWrite";

export async function GET() {
  const posts = readFromFile();
  return Response.json(posts);
}

export async function POST(request: Request) {
  let posts = readFromFile();

  const body = await request.json();
  const safeParse = postSchema.safeParse(body);
  if (!safeParse.success) {
    return NextResponse.json(
      {
        message: "Request body could not be read properly.",
      },
      { status: 400 },
    );
  }

  posts = [
    ...posts,
    {
      ...safeParse.data,
      id: safeParse.data.id ?? Math.floor(Math.random() * 10000),
    },
  ];
  writeToFile(posts);
  return NextResponse.json(
    { message: "post created successfully" },
    { status: 201 },
  );
}

export async function PUT(request: Request) {
  let posts = readFromFile();

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

  if (!posts.find((post) => post.id === newPost.id)) {
    return NextResponse.json(
      {
        message: "post not found",
      },
      { status: 404 },
    );
  }

  posts = posts.map((post) => (post.id === newPost.id ? newPost : post));
  writeToFile(posts);
  return NextResponse.json({ message: "post updated" }, { status: 200 });
}

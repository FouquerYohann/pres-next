"use client";

import { Stack, Typography } from "@mui/material";
import { CreatePostForm } from "@/app/post/create/(component)/createPostForm";

export default function CreatePost() {
  return (
    <Stack p={3} gap={3}>
      <Typography variant={"h2"}>Create a new post</Typography>
      <CreatePostForm />
    </Stack>
  );
}

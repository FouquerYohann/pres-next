import { useState } from "react";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostCreateInputSchema } from "@/prisma/generated/zod";
import { Prisma } from "@prisma/client";
import { PostWithUser } from "@/app/post/type/PostType";

const emptyPost: Prisma.PostCreateInput = {
  title: "",
  body: "",
  user: {
    connect: { id: 1 },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const otherTypeOfCreate: Prisma.PostCreateInput = {
  title: "",
  body: "",
  user: {
    create: { email: "newuser@example.com", name: "New User" },
  },
};

// use to show init async of form todo replace with our fetch
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchData = async (): Promise<PostWithUser> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        userId: 1,
        title: "My First Post",
        body: "This is the content of my first post. It's very exciting!",
        user: { email: "coucou@stra.com", name: "yoyo", id: 1 },
      });
    }, 5000);
  });
};

const createNewPost = async (post: Prisma.PostCreateInput) => {
  return fetch("http://localhost:3000/api/post", {
    method: "POST",
    body: JSON.stringify(post),
  });
};

export const CreatePostForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Prisma.PostCreateInput>({
    resolver: zodResolver(PostCreateInputSchema),
    defaultValues: emptyPost,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(
    (validData) => {
      setIsLoading(true);
      return createNewPost(validData).then((resp) => {
        if (resp.ok) {
          reset();
          setIsLoading(false);
        }
      });
    },
    async (invalidData) => console.error("invalidData", invalidData),
  );

  return (
    <form onSubmit={onSubmit}>
      <Stack p={3} gap={3}>
        <Controller
          control={control}
          name={"title"}
          defaultValue={""}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label={"Title"}
              error={!!errors.title}
              helperText={errors.title?.message ?? ""}
            />
          )}
        />

        <Controller
          control={control}
          name={"body"}
          defaultValue={""}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              rows={4}
              label={"Body"}
              error={!!errors.body}
              helperText={errors.body?.message ?? ""}
            />
          )}
        />
        <Button variant="contained" type="submit">
          {isLoading ? <CircularProgress color={"info"} /> : "Submit"}
        </Button>
      </Stack>
    </form>
  );
};

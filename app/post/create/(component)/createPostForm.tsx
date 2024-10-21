import { ChangeEvent, useState } from "react";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { postSchema, PostType } from "@/app/post/type/PostType";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/app/post/[id]/loading";

const emptyPost: PostType = {
  title: "",
  body: "",
  userId: -1,
};

// use to show init async of form todo replace with our fetch
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchData = async (): Promise<PostType> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: "My First Post",
        body: "This is the content of my first post. It's very exciting!",
        userId: 1,
      });
    }, 5000);
  });
};

const createNewPost = async (post: PostType) => {
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
  } = useForm<PostType>({
    resolver: zodResolver(postSchema),
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
          name={"userId"}
          render={({ field }) => (
            <TextField
              {...field}
              inputMode={"numeric"}
              required
              label={field.name}
              error={!!errors.userId}
              helperText={errors.userId?.message ?? ""}
            />
          )}
        />

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

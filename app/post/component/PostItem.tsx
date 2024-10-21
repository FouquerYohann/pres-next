import { PostType } from "@/app/post/type/PostType";
import { FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export const PostItem: FC<{ post: PostType; showLinkButton?: boolean }> = ({
  post: { id, title, body },
  showLinkButton,
}) => {
  return (
    <Stack direction={"row"} gap={5} alignContent={"center"}>
      <Stack gap={1}>
        <Typography variant={"h5"}>{title}</Typography>
        <Typography variant={"body2"}>{body}</Typography>
      </Stack>
      {showLinkButton && (
        <Link href={`/post/${id}`} passHref>
          <Button variant={"outlined"}>Go To</Button>
        </Link>
      )}
    </Stack>
  );
};

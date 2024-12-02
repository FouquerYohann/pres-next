import { PostWithUser } from "@/app/post/type/PostType";
import { FC } from "react";
import { Button, Stack, Typography } from "@mui/material";

export const PostItem: FC<{
  post: PostWithUser;
  showLinkButton?: boolean;
}> = ({ post: { id, title, body, user }, showLinkButton }) => {
  return (
    <Stack direction={"row"} gap={5} alignContent={"center"}>
      <Stack gap={1}>
        {user && (
          <Typography variant={"h4"}>{`made by ${user.name}`}</Typography>
        )}
        <Typography variant={"h5"}>{title}</Typography>
        <Typography variant={"body2"}>{body}</Typography>
      </Stack>
      {showLinkButton && (
        <a href={`/post/${id}`}>
          <Button variant={"outlined"}>Go To</Button>
        </a>
      )}
    </Stack>
  );
};

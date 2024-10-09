import { PostType } from "@/app/post/type/PostType";
import { FC } from "react";

export const PostItem: FC<{ post: PostType }> = ({ post: { title, body } }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{body}</p>
      <hr />
    </div>
  );
};

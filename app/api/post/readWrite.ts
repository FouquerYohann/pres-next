import { PostType } from "@/app/post/type/PostType";
import * as fs from "node:fs";

export const writeToFile = (posts: PostType[]) => {
  fs.writeFileSync("app/api/post/data.json", JSON.stringify(posts, null, 2));
};

export const readFromFile = () => {
  const content = fs.readFileSync("app/api/post/data.json", "utf-8");
  return JSON.parse(content) as PostType[];
};

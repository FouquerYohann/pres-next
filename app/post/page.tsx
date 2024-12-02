import { PostWithUser } from "@/app/post/type/PostType";
import { PostItem } from "@/app/post/component/PostItem";
import { Box, Stack } from "@mui/material";

export const dynamic = "force-dynamic";

const getPosts = async () => {
  console.log("fetched posts");
  return fetch("http://localhost:3000/api/post", { cache: "no-cache" })
    .then((response) => response.json())
    .then((posts) => posts as PostWithUser[]);
};

export default async function Post() {
  const posts = await getPosts();
  return (
    <Box pl={2}>
      <h2>Post</h2>
      <Stack gap={4}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} showLinkButton />
        ))}
      </Stack>
    </Box>
  );
}

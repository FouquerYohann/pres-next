import { PostType } from "@/app/post/type/PostType";
import { PostItem } from "@/app/post/component/PostItem";

const getPosts = async () => {
  console.log("fetched posts");
  return fetch("http://localhost:3000/api/post", { cache: "no-cache" })
    .then((response) => response.json())
    .then((posts) => posts as PostType[]);
};

export default async function Post() {
  const posts = await getPosts();
  return (
    <div>
      <h2>Post</h2>
      <div>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

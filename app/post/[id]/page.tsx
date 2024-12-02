import { notFound } from "next/navigation";
import { PostItem } from "@/app/post/component/PostItem";
import { PostWithUser } from "@/app/post/type/PostType";

type PostIdProps = { params: { id: string } };
export const dynamic = "force-dynamic";

async function getPost(id: string): Promise<PostWithUser> {
  return fetch(`http://localhost:3000/api/post/${id}`, { cache: "no-cache" })
    .then((resp) => {
      if (!resp.ok) {
        notFound();
      }
      return resp;
    })
    .then((response) => response.json())
    .then((posts) => {
      console.log(posts);
      return posts as PostWithUser;
    });
}

export default async function PostID({
  params: { id },
}: Readonly<PostIdProps>) {
  if (!/^\d+$/.test(id)) {
    notFound();
  }
  if (id === "42") {
    throw new Error("aaaaargh");
  }

  const post = await getPost(id);

  return (
    <div>
      <PostItem post={post} />
    </div>
  );
}

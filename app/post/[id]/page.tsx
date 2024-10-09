import { notFound } from "next/navigation";
import { PostType } from "@/app/post/type/PostType";
import { PostItem } from "@/app/post/component/PostItem";

type PostIdProps = { params: { id: string } };

async function getPost(id: string): Promise<PostType> {
  console.log(`fetched posts ${id}`);
  return fetch(`http://localhost:3000/api/post/${id}`)
    .then((resp) => {
      if (!resp.ok) {
        notFound();
      }
      return resp;
    })
    .then((response) => response.json())
    .then((posts) => posts as PostType);
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
      <div>
        <div>
          Note that this page is no cached and rerendered because of the dynamic
          route
        </div>
        <div>{Math.random()}</div>
      </div>
      <PostItem post={post} />
    </div>
  );
}

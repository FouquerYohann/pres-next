import { notFound } from "next/navigation";

type PostIdProps = { params: { id: string } };
type Post = {
  id: string;
  title: string;
  content: string;
};
async function getPost(id: string): Promise<Post> {
  // Simulate a 5-second delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        title: "My First Post",
        content: "This is the content of my first post. It's very exciting!",
      });
    }, 5000);
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

  const { content, id: id1, title } = await getPost(id);

  return (
    <div>
      <div>
        <div>
          Note that this page is no cached and rerendered because of the dynamic
          route
        </div>
        <div>{Math.random()}</div>
      </div>
      Post ID
      <div>{id1}</div>
      <div>{title}</div>
      <div>{content}</div>
    </div>
  );
}

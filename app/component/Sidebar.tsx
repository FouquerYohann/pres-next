import Link from "next/link";

export function Sidebar() {
  return (
    <div>
      <div>Sidebar</div>
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/post"}>Post</Link>
          <ul>
            <li>
              <Link href={"/post/randomNumber"}>Random Number</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href={"/post/create"}>Create new post</Link>
        </li>
      </ul>
    </div>
  );
}

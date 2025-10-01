import { PostsService } from "../services/PostsService";
import Link from "next/link";

export default async function Home() {
  const posts = await PostsService.getAll();
  return (
    <main>
      <section>
        <ul className="flex flex-col justify-center items-center text-center gap-4">
          {posts.slice(0, 12).map((post) => (
            <li className="item" key={post.id}>
              <Link className="link" href={`/post/${post.id}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

import { SERVER_URL } from "@/lib/api";
import { PostsService } from "@/services/PostsService";
import Link from "next/link";

export const revalidate = 60;

export default async function ISR() {
  const { posts } = await PostsService.getAllWithFiles();
  return (
    <main>
      <section>
        <ul className="flex flex-col gap-3.5">
          {posts.map((post) => (
            <li key={post.id} className="bg-amber-50 p-2">
              <h2 className="text-black font-bold">{post.title}</h2>
              <Link
                className="text-black font-medium hover:text-blue-400 active:text-blue-400 transition-colors"
                href={`${SERVER_URL}/download/${post.filename}`}
              >
                Download File
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

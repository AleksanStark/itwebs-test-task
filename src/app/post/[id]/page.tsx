import { PostsService } from "@/services/PostsService";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await PostsService.getAll();

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = parseInt(id);
  const post = await PostsService.getById(postId);

  const posts = (await PostsService.getAll()).slice(0, 12);
  const maxId = posts.length;
  const minId = 1;

  return (
    <main className=" ">
      <div className="flex flex-col justify-center items-center gap-2">
        <nav className="w-[400px] flex justify-between items-stretch">
          {postId > minId ? (
            <Link
              className="block font-medium p-2.5 bg-amber-50 text-black"
              href={`/post/${postId - 1}`}
            >
              &larr; Prev
            </Link>
          ) : (
            <span />
          )}
          {postId < maxId ? (
            <Link
              className="block font-medium p-2.5 bg-amber-50 text-black"
              href={`/post/${postId + 1}`}
            >
              Next &rarr;
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <article className="w-2xs">
          <h2 className="mb-2 text-center">{post.title}</h2>
          <p>{post.body}</p>
        </article>
      </div>
    </main>
  );
}

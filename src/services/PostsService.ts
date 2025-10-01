import { apiFetch, SERVER_URL } from "@/lib/api";
import { Post, PostsResponse } from "@/types/interfaces";

export const PostsService = {
  getAll: (): Promise<Post[]> =>
    apiFetch("https://jsonplaceholder.typicode.com/posts", {}),
  getById: (id: number): Promise<Post> =>
    apiFetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {}),
  getAllWithFiles: (): Promise<PostsResponse> =>
    apiFetch(`${SERVER_URL}/posts`, {}),
};

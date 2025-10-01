export type SocketMessage =
  | { type: "all_files"; payload: PostWithFile[] }
  | { type: "new_file"; payload: PostWithFile };

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostWithFile {
  id: number;
  title: string;
  original_filename: string;
  filename: string;
}

export interface PostsResponse {
  posts: PostWithFile[];
}

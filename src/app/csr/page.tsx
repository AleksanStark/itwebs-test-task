"use client";

import Modal from "@/components/Modal";
import { PostWithFile, SocketMessage } from "@/types/interfaces";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SERVER_URL, WSS_URL } from "@/lib/api";

export default function CSR() {
  const [posts, setPosts] = useState<PostWithFile[]>([]);

  useEffect(() => {
    const socket = new WebSocket(WSS_URL);

    socket.onopen = () => {
      console.log("Connected");
      socket.send(JSON.stringify({ type: "get_files" }));
    };

    socket.onmessage = (event) => {
      const data: SocketMessage = JSON.parse(event.data);
      if (data.type === "all_files") {
        console.log(data.payload);
        setPosts(data.payload);
      }

      if (data.type === "new_file") {
        setPosts((prev) => [...prev, data.payload]);
      }
    };

    return () => socket.close();
  }, []);
  return (
    <main>
      <section>
        <Modal />
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

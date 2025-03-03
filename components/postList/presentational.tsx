"use client";

import { PostItem } from "@/components/postItem";
import { Post } from "@prisma/client";

type PostWithAuthor = Post & {
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type PostListPresentationalType = {
  isDashboard: boolean;
  posts: PostWithAuthor[];
};

export const PostListPresentational = ({
  posts,
}: PostListPresentationalType) => {
  return (
    <ul className="divide-y divide-gray-300">
      {posts.length ? (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <p className="text-center mt-8">記事が見つかりませんでした。</p>
      )}
    </ul>
  );
};

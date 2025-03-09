"use client";

import Link from "next/link";
import { Post } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

import { MessageCircle } from "lucide-react";
import { PostOperation } from "@/components/postOperation";
import { Author } from "@/components/author";

type PostWithAuthor = Post & {
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type PostItemPresentationalType = {
  isDashboard: boolean;
  post: PostWithAuthor;
};

export const PostItemPresentational = ({
  post,
  isDashboard,
}: PostItemPresentationalType) => {
  return (
    <li key={post.id} className="pb-4">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Author author={post.author} />
          {isDashboard && (
            <Badge
              className={`text-xs border bg-transparent ${
                post.published
                  ? "text-green-600 border-green-600"
                  : "text-red-600 border-red-600"
              }`}
            >
              {post.published ? "公開中" : "下書き"}
            </Badge>
          )}
        </div>
        {isDashboard && <PostOperation postId={post.id} />}
      </div>
      <Link className="block" href={`/post/${post.id}`}>
        <p className="text-xl font-bold hover:underline mt-4">{post.title}</p>
      </Link>
      <div className="flex gap-2 mt-4 items-center justify-between">
        <ul className="flex items-center gap-2">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="outline" className="border border-primary">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
        <p className="text-sm flex items-center gap-1">
          <MessageCircle size={18} />
          {post.numberOfAnswers}件
        </p>
      </div>
    </li>
  );
};

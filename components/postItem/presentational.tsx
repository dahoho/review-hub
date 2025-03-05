"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { Post } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { MessageCircle } from "lucide-react";
import { PostOperation } from "@/components/postOperation";
import { DATE_FORMAT } from "@/constans";

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
    <li key={post.id} className="p-5">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.author.image} alt={post.author.name} />
          </Avatar>
          <p className="text-sm">{post.author.name}</p>
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
      <time
        dateTime={dayjs(post.createdAt).format(DATE_FORMAT)}
        className="text-sm text-gray-500 mt-4 block"
      >
        {dayjs(post.createdAt).format(DATE_FORMAT)}
      </time>
      <Link className="block" href={`/post/${post.id}`}>
        <p className="text-lg font-bold hover:underline mt-4">{post.title}</p>
      </Link>
      <p className="text-sm mt-4 flex items-center gap-1">
        <MessageCircle size={18} />
        {post.numberOfAnswers}
      </p>
      <ul className="flex items-center gap-2 mt-2.5">
        {post.tags.map((tag) => (
          <li key={tag}>
            <Badge variant="outline">{tag}</Badge>
          </li>
        ))}
      </ul>
    </li>
  );
};

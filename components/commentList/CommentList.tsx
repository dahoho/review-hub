"use client";

import { CommentOperation } from "@/components/commentOperation";
import { InlineCommentEditor } from "@/components/inlineCommentEditor";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DATE_FORMAT } from "@/constans";
import { useCommentEditing } from "@/hooks/useCommentEditing";
import { useCommentReply } from "@/hooks/useCommentReply";

import dayjs from "dayjs";
import { MessageCircle } from "lucide-react";
import { User } from "next-auth";

type CommentListPropsType = {
  initialComment: {
    author: {
      image: string | null;
      name: string | null;
    };
  } & {
    id: string;
    authorId: string;
    createdAt: Date;
    content: string;
    postId: string;
    updatedAt: Date;
    replies?: CommentListPropsType["initialComment"][];
  };
  user?: User;
  post: {
    createdAt: Date;
  };
};

export const CommentList = ({
  initialComment,
  user,
  post,
}: CommentListPropsType) => {
  const { isEditing, setIsEditing, comment, handleSaveEdit } =
    useCommentEditing(initialComment);
  const { isReplying, setIsReplying, replies, handleReply } = useCommentReply({
    initialComment,
    comment,
  });

  return (
    <li key={comment.id}>
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={comment.author.image ?? ""}
              alt={comment.author.name ?? ""}
            />
          </Avatar>
          <p className="text-sm">{comment.author.name}</p>
        </div>
        {user?.id === comment.authorId && (
          <CommentOperation
            commentId={comment.id}
            handleEditing={() => setIsEditing(true)}
          />
        )}
      </div>
      <time
        dateTime={dayjs(comment.createdAt).format(DATE_FORMAT)}
        className="text-sm text-gray-500 mt-4 block"
      >
        {dayjs(post.createdAt).format(DATE_FORMAT)}
      </time>
      {isEditing ? (
        <InlineCommentEditor
          initialContent={comment.content}
          onSave={(newContent) => handleSaveEdit(newContent)}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div
          className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none "
          dangerouslySetInnerHTML={{ __html: String(comment.content) }}
        />
      )}

      {/* 返信ボタン */}
      {!isReplying && (
        <div className="ml-8">
          <button
            className="text-gray-500 text-sm flex items-center gap-2 cursor-pointer"
            onClick={() => setIsReplying((prev) => !prev)}
          >
            <MessageCircle size={18} />
            返信
          </button>
        </div>
      )}

      {/* 返信エディタ */}
      {isReplying && (
        <div className="ml-8 mt-2">
          <InlineCommentEditor
            initialContent=""
            onSave={(replyContent) => handleReply(replyContent)}
            onCancel={() => setIsReplying(false)}
          />
        </div>
      )}

      {/* 返信コメントのレンダリング */}
      {replies.length > 0 && (
        <ul className="ml-8 mt-4">
          {replies.map((reply) => (
            <CommentList
              key={reply.id}
              initialComment={reply}
              user={user}
              post={post}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

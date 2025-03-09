"use client";

import { Author } from "@/components/author";
import { CommentOperation } from "@/components/commentOperation";
import { InlineCommentEditor } from "@/components/inlineCommentEditor";
import { ReplyButton } from "@/components/replyButton";

import { DATE_FORMAT } from "@/constans";
import { useCommentEditing } from "@/hooks/useCommentEditing";
import { useCommentReply } from "@/hooks/useCommentReply";

import dayjs from "dayjs";
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
    parentId?: string;
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
        <Author author={comment.author} />
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
      {!isReplying && !comment.parentId && (
        <ReplyButton handleClickSetReplying={() => setIsReplying(true)} />
      )}

      {/* 返信エディタ */}
      {isReplying && (
        <InlineCommentEditor
          initialContent=""
          onSave={(replyContent) => handleReply(replyContent)}
          onCancel={() => setIsReplying(false)}
        />
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

"use client";

import { CommentOperation } from "@/components/commentOperation";
import { InlineCommentEditor } from "@/components/inlineCommentEditor";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DATE_FORMAT } from "@/constans";
import { useCommentEditing } from "@/hooks/useCommentEditing";

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

  return (
    <li key={comment.id}>
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={comment.author.image} alt={comment.author.name} />
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
        className="text-md text-gray-500 mt-4 block"
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
          className="prose mt-6"
          dangerouslySetInnerHTML={{ __html: String(comment.content) }}
        />
      )}
    </li>
  );
};

import { User } from "next-auth";
import { useState } from "react";

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

type CommentReplyType = {
  initialComment: CommentListPropsType["initialComment"];
  comment: CommentListPropsType["initialComment"];
};

export const useCommentReply = ({
  initialComment,
  comment,
}: CommentReplyType) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replies, setReplies] = useState(initialComment.replies || []);

  const handleReply = async (replyContent: string) => {
    try {
      const res = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: comment.postId,
          content: replyContent,
          parentId: comment.id, // 返信対象のコメントID
        }),
      });
      if (res.ok) {
        const newReply = await res.json();
        // 返信コメントリストに追加
        setReplies((prev) => [...prev, newReply]);
        setIsReplying(false);
      } else {
        console.error("返信の投稿に失敗しました");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { isReplying, setIsReplying, replies, handleReply };
};

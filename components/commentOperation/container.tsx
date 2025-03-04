"use client";

import { CommentOperationPresentational } from "@/components/commentOperation/presentational";
import { useDeleteComment } from "@/hooks/useDeleteComment";

type PostOperationContainerType = {
  commentId: string;
};

export const CommentOperationContainer = ({
  commentId,
}: PostOperationContainerType) => {
  const {
    deleteComment,
    showDialog,
    setShowDialog,
    isDeleteLoading,
    setIsDeleteLoading,
  } = useDeleteComment();

  return (
    <CommentOperationPresentational
      commentId={commentId}
      deleteComment={deleteComment}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      isDeleteLoading={isDeleteLoading}
      setIsDeleteLoading={setIsDeleteLoading}
    />
  );
};

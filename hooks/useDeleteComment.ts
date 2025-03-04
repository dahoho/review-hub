"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const useDeleteComment = () => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const router = useRouter();

  const deleteComment = async (commentId: string) => {
    setIsDeleteLoading(true);
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("コメントの削除に失敗しました");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return {
    deleteComment,
    isDeleteLoading,
    setIsDeleteLoading,
    showDialog,
    setShowDialog,
  };
};

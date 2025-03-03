"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useCreatePost = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createPost = async () => {
    setIsLoading(true);

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "タイトルはありません",
      }),
    });

    setIsLoading(false);

    if (!response.ok) {
      toast.error("問題が発生しました", {
        description: "投稿が作成されませんでした。もう一度お試しください。",
      });
      return;
    }

    const post = await response.json();

    router.refresh();
    router.push(`/editor/${post.id}`);
  };
  return {
    isLoading,
    createPost,
  };
};

"use client";

import { EditorOperationPresentational } from "@/components/editorOperation/presentational";
import { postPatchSchemaType, postPatchSchema } from "@/lib/validations/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditorOperationContainerType = {
  postId: string;
};

export const EditorOperationContainer = ({
  postId,
}: EditorOperationContainerType) => {
  const router = useRouter();
  const [operation, setOperation] = useState<"publish" | "draft" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isPostUpdated, setIsPostUpdated] = useState<boolean>(false);
  const initialUnmountRef = useRef<boolean>(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<postPatchSchemaType>({
    resolver: zodResolver(postPatchSchema),
    defaultValues: {
      tags: [],
    },
  });
  console.log("errors", errors);

  const onSubmit = async (data: postPatchSchemaType) => {
    setIsSubmitting(true);

    const response = await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: data.content,
        published: operation === "publish",
        tags: data.tags,
      }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      return toast.error("問題が発生しました", {
        description: "記事が保存されませんでした。もう一度お試しください。",
      });
    }

    router.refresh();
    setIsPostUpdated(true);
    toast.success("success", {
      description: "正常に保存されました",
    });
  };

  // 投稿が更新されずにページを離れたときは、空のレコードを削除する
  useEffect(() => {
    return () => {
      // 初回のアンマウント（Strict Mode によるシミュレーション）の場合はスキップする
      if (initialUnmountRef.current) {
        initialUnmountRef.current = false;
        return;
      }

      if (!isPostUpdated) {
        fetch(`/api/posts/${postId}`, {
          method: "DELETE",
        }).catch((error) => console.error("削除エラー:", error));
      }
    };
  }, [isPostUpdated]);

  return (
    <EditorOperationPresentational
      setOperation={setOperation}
      isSubmitting={isSubmitting}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      setValue={setValue}
      operation={operation}
    />
  );
};

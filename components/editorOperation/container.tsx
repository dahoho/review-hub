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
  // 初回のアンマウント（Strict Mode のシミュレーション）を防ぐための ref
  const initialUnmountRef = useRef<boolean>(true);
  // 投稿が正常に更新されたかどうかを追跡する ref
  const postUpdatedRef = useRef<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<postPatchSchemaType>({
    resolver: zodResolver(postPatchSchema),
    defaultValues: {
      tags: [],
    },
  });
  console.log("errors", errors);

  const pullRequestValue = watch("pullRequestUrl");

  const onSubmit = async (data: postPatchSchemaType) => {
    setIsSubmitting(true);

    console.log("data", data.pullRequestUrl);
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
        pullRequestUrl: data.pullRequestUrl,
      }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      return toast.error("問題が発生しました", {
        description: "記事が保存されませんでした。もう一度お試しください。",
      });
    }

    postUpdatedRef.current = true;
    router.refresh();
    toast.success("success", {
      description: "正常に保存されました",
    });
  };

  // クリーンアップ関数で、更新されていない場合のみ DELETE を実行
  useEffect(() => {
    return () => {
      // 初回のアンマウント（Strict Mode シミュレーション）では処理をスキップ
      if (initialUnmountRef.current) {
        initialUnmountRef.current = false;
        return;
      }

      // 更新されていない場合のみレコード削除を実行
      if (!postUpdatedRef.current) {
        console.log("⭐️ 投稿が更新されていないため、レコード削除を実行");
        fetch(`/api/posts/${postId}`, {
          method: "DELETE",
        }).catch((error) => console.error("削除エラー:", error));
      }
    };
  }, [postId]);

  return (
    <EditorOperationPresentational
      setOperation={setOperation}
      isSubmitting={isSubmitting}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      setValue={setValue}
      operation={operation}
      pullRequestValue={pullRequestValue}
    />
  );
};

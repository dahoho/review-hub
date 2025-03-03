"use client";

import { EditorOperationPresentational } from "@/components/editorOperation/presentational";
import { postPatchSchemaType, postPatchSchema } from "@/lib/validations/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    toast.success("success", {
      description: "正常に保存されました",
    });
  };

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

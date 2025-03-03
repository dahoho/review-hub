"use client";

import CommentEditor from "@/components/commentEditor";
import { Button } from "@/components/ui/button";
import { commentPostSchemaType } from "@/lib/validations/comments";
import { Loader2 } from "lucide-react";
import { UseFormHandleSubmit, UseFormSetValue } from "react-hook-form";

type CommentFormType = {
  isSubmitting: boolean;
  handleSubmit: UseFormHandleSubmit<commentPostSchemaType, undefined>;
  setValue: UseFormSetValue<commentPostSchemaType>;
  onSubmit: (
    data: commentPostSchemaType
  ) => Promise<string | number | undefined>;
};

export const CommentFormPresentational = ({
  isSubmitting,
  handleSubmit,
  setValue,
  onSubmit,
}: CommentFormType) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-4">
        <Button type="submit" className="px-6 cursor-pointer">
          {isSubmitting && <Loader2 className="animate-spin" />}
          投稿する
        </Button>
      </div>
      <div className="mt-6">
        <CommentEditor setValue={setValue} />
      </div>
    </form>
  );
};

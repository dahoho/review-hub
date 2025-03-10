"use client";

import { PostEditor } from "@/components/postEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORY_MENU_ITEMS } from "@/constans";
import { postPatchSchemaType } from "@/lib/validations/post";
import { Loader2, TagIcon } from "lucide-react";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";

type EditorOperationType = {
  setOperation: (operation: "publish" | "draft") => void;
  isSubmitting: boolean;
  register: UseFormRegister<postPatchSchemaType>;
  handleSubmit: UseFormHandleSubmit<postPatchSchemaType, undefined>;
  setValue: UseFormSetValue<postPatchSchemaType>;
  onSubmit: (data: postPatchSchemaType) => Promise<string | number | undefined>;
  operation: "publish" | "draft" | null;
};

export const EditorOperationPresentational = ({
  setOperation,
  isSubmitting,
  register,
  handleSubmit,
  setValue,
  onSubmit,
  operation,
}: EditorOperationType) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          className="bg-transparent font-bold py-2 px-4 !text-2xl h-14"
          placeholder="タイトルを入力してください"
          {...register("title")}
        />
      </div>
      <div className="mt-8 flex items-center gap-2">
        <TagIcon size={20} />
        <div className="flex gap-4">
          {CATEGORY_MENU_ITEMS.map((tag) => {
            if (tag.name === "すべて") return null;
            return (
              <label key={tag.name} className="flex items-center gap-1">
                <input type="checkbox" value={tag.name} {...register("tags")} />
                <span>{tag.name}</span>
              </label>
            );
          })}
        </div>
      </div>
      <div className="mt-6">
        <PostEditor setValue={setValue} />
      </div>
      <div className="flex items-center gap-6 mt-6">
        <Button
          type="submit"
          className="px-6 cursor-pointer"
          onClick={() => setOperation("publish")}
        >
          {isSubmitting && operation === "publish" && (
            <Loader2 className="animate-spin" />
          )}
          公開
        </Button>
        <Button
          type="submit"
          onClick={() => setOperation("draft")}
          className="px-6 cursor-pointer"
        >
          {isSubmitting && operation === "draft" && (
            <Loader2 className="animate-spin" />
          )}
          下書き保存
        </Button>
      </div>
    </form>
  );
};

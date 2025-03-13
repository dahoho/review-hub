"use client";

import { Editor } from "@/components/editor/Editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORY_MENU_ITEMS } from "@/constans";
import { postPatchSchemaType } from "@/lib/validations/post";
import { Loader2 } from "lucide-react";
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
  pullRequestValue: string;
};

export const EditorOperationPresentational = ({
  setOperation,
  isSubmitting,
  register,
  handleSubmit,
  setValue,
  onSubmit,
  operation,
  pullRequestValue,
}: EditorOperationType) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <h2 className="text-lg font-bold">プルリクエストURL</h2>
        <Input
          className="bg-transparent font-bold py-2 px-4 h-10 mt-2"
          placeholder="GitHubのプルリクエストURLを入力してください"
          {...register("pullRequestUrl")}
        />
      </section>
      <section className="mt-12">
        <h2 className="text-lg font-bold">タグ</h2>
        <div className="flex items-center gap-2">
          <div className="flex flex-wrap md:gap-4 gap-2 mt-4">
            {CATEGORY_MENU_ITEMS.map((tag) => {
              if (tag.name === "すべて") return null;
              return (
                <label
                  key={tag.name}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    value={tag.name}
                    {...register("tags")}
                  />
                  <span>{tag.name}</span>
                </label>
              );
            })}
          </div>
        </div>
      </section>

      {!pullRequestValue && (
        <section className="mt-12">
          <p className="text-lg font-bold">レビュー依頼内容</p>
          <p className="mt-4 text-sm font-normal text-gray-500 block">
            ※プルリクエストではなく、直接レビュー依頼をしたい場合は【レビュー依頼内容】を入力してください。
          </p>
          <div className="mt-8">
            <Input
              className="bg-transparent font-bold py-2 px-4 !text-2xl h-14"
              placeholder="タイトルを入力してください"
              {...register("title")}
            />
          </div>
          <Editor setValue={setValue} />
        </section>
      )}

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

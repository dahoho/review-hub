"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { UseFormSetValue } from "react-hook-form";

type PostEditorPropsType = {
  setValue: UseFormSetValue<{
    title: string;
    content?: string;
    published?: boolean;
    tags: string[];
  }>;
};

const PostEditor = ({ setValue }: PostEditorPropsType) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "ここに記事を入力してください",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      console.log(editor.getHTML());
      const html = editor.getHTML();
      setValue("content", html);
    },
  });

  return (
    <div className="mt-4 relative border border-gray-400 rounded-lg min-h-[400px]">
      <EditorContent editor={editor} className="w-full h-full pl-4 pt-2" />
    </div>
  );
};

export default PostEditor;

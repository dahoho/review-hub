"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { UseFormSetValue } from "react-hook-form";

type CommentEditorPropsType = {
  setValue: UseFormSetValue<{
    content: string;
  }>;
};

const CommentEditor = ({ setValue }: CommentEditorPropsType) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "ここにコメントを入力してください",
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
    <div className="mt-4 relative border border-gray-300 rounded-lg min-h-[240px] ">
      <EditorContent editor={editor} className="w-full h-full pl-4 pt-2" />
    </div>
  );
};

export default CommentEditor;

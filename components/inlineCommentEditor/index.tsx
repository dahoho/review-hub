import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "@/components/Toolbar/Toolbar";

export const InlineCommentEditor = ({
  initialContent,
  onSave,
  onCancel,
}: {
  initialContent: string;
  onSave: (newContent: string) => void;
  onCancel: () => void;
}) => {
  const [content, setContent] = useState(initialContent);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "ここにコメントを編集してください",
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  return (
    <div className="mt-4">
      <div className="relative border border-gray-300 rounded-lg min-h-[240px]">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} className="w-full h-full pl-4 pt-2" />
      </div>
      <div className="mt-2 flex gap-2">
        <Button onClick={() => onSave(content)}>保存</Button>
        <Button variant="outline" onClick={onCancel}>
          キャンセル
        </Button>
      </div>
    </div>
  );
};

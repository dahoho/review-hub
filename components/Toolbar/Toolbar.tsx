import { Editor } from "@tiptap/react";
import {
  BetweenHorizontalStartIcon,
  BoldIcon,
  Code2Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Link2Icon,
  Link2OffIcon,
  List,
  ListOrderedIcon,
  QuoteIcon,
  Redo2Icon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { useCallback } from "react";

type ToolbarPropsType = {
  editor: Editor | null;
};

export const Toolbar = ({ editor }: ToolbarPropsType) => {
  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("An error occurred");
      }
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <>
      <div className="border-b border-gray-300 flex items-center py-2 px-5 gap-4">
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            !editor.isActive("heading", { level: 2 }) ? "opacity-20" : ""
          }
        >
          <Heading2Icon />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            !editor.isActive("heading", { level: 3 }) ? "opacity-20" : ""
          }
        >
          <Heading3Icon />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            !editor.isActive("heading", { level: 4 }) ? "opacity-20" : ""
          }
        >
          <Heading4Icon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={!editor.isActive("bulletList") ? "opacity-20" : ""}
        >
          <List />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={!editor.isActive("orderedList") ? "opacity-20" : ""}
        >
          <ListOrderedIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={!editor.isActive("bold") ? "opacity-20" : ""}
        >
          <BoldIcon />
        </button>
        <button
          type="button"
          onClick={setLink}
          className={editor.isActive("link") ? "is-active" : ""}
        >
          <Link2Icon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
        >
          <Link2OffIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <UnderlineIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={!editor.isActive("strike") ? "opacity-20" : ""}
        >
          <StrikethroughIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={!editor.isActive("codeBlock") ? "opacity-20" : ""}
        >
          <Code2Icon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={!editor.isActive("blockquote") ? "opacity-20" : ""}
        >
          <QuoteIcon />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <BetweenHorizontalStartIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo2Icon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo2Icon />
        </button>
      </div>
    </>
  );
};

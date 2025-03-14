import { CreatePostButton } from "@/components/createPostButton";
import { UserDropdownMenu } from "@/components/userDropdownMenu";

import { Bell, Code2Icon, Search } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";

type HeaderPresentationalPropsType = {
  user?: User;
  createPost: () => void;
  isLoading: boolean;
  isEditorPage: boolean;
};

export const HeaderPresentational = ({
  user,
  createPost,
  isLoading,
  isEditorPage,
}: HeaderPresentationalPropsType) => {
  return (
    <header className="h-14 flex items-center justify-between px-5 border-b border-gray-300">
      <h1 className="md:text-xl font-bold">
        <Link href="/" className="flex items-center gap-2">
          <Code2Icon />
          Review Hub
        </Link>
      </h1>
      <div className="flex items-center gap-4">
        <Search className="md:w-6 w-5 cursor-pointer" />
        <Bell className="md:w-6 w-5 cursor-pointer" />
        <UserDropdownMenu user={user} />
        {!isEditorPage && (
          <CreatePostButton createPost={createPost} isLoading={isLoading} />
        )}
      </div>
    </header>
  );
};

import { CreatePostButton } from "@/components/createPostButton/CreatePostButton";
import { UserDropdownMenu } from "@/components/userDropdownMenu/UserDropdownMenu";
import { Bell, Search } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";

type HeaderPresentationalPropsType = {
  user?: User;
  createPost: () => void;
  isLoading: boolean;
};

export const HeaderPresentational = ({
  user,
  createPost,
  isLoading,
}: HeaderPresentationalPropsType) => {
  return (
    <header className="h-14 flex items-center justify-between px-5 border-b border-gray-400">
      <h1 className="md:text-xl font-bold">
        <Link href="/">Review Hub</Link>
      </h1>
      <div className="flex items-center gap-4">
        <Search className="md:w-6 w-5 cursor-pointer" />
        <Bell className="md:w-6 w-5 cursor-pointer" />
        <UserDropdownMenu user={user} />
        <CreatePostButton createPost={createPost} isLoading={isLoading} />
      </div>
    </header>
  );
};

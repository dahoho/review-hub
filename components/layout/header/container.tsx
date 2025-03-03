"use client";

import { HeaderPresentational } from "@/components/layout/header/presentational";
import { useCreatePost } from "@/hooks/useCreatePost";
import { User } from "next-auth";

type HeaderPresentationalPropsType = {
  user?: User;
};

export const HeaderContainer = ({ user }: HeaderPresentationalPropsType) => {
  const { createPost, isLoading } = useCreatePost();

  return (
    <HeaderPresentational
      user={user}
      createPost={createPost}
      isLoading={isLoading}
    />
  );
};

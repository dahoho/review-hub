import { LayoutContainer } from "@/components/layout/layout/container";
import { MainLayout } from "@/components/layout/mainLayout";
import { Profile } from "@/components/profile/Profile";
import { ProfilePost } from "@/components/profilePost/ProfilePost";
import { getCurrentUser } from "@/lib/session";
import { fetchPosts } from "@/service/postService";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  // ユーザーのセッション情報を取得
  const user = await getCurrentUser();

  // セッションがない場合はログインページにリダイレクト
  if (!user) return redirect("/login");

  // ユーザーに紐づく投稿を取得
  const post = await fetchPosts(user.id);

  return (
    <LayoutContainer user={user}>
      <MainLayout>
        <Profile user={user} />
        <ProfilePost post={post} />
      </MainLayout>
    </LayoutContainer>
  );
}

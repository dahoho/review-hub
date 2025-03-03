import { LayoutContainer } from "@/components/layout/layout/container";
import { MainLayout } from "@/components/layout/mainLayout";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function SettingAccountPage() {
  // ユーザーのセッション情報を取得
  const user = await getCurrentUser();

  // セッションがない場合はログインページにリダイレクト
  if (!user) return redirect("/login");

  return (
    <LayoutContainer user={user}>
      <MainLayout>
        <div className="px-5 mt-14">
          <h2 className="text-3xl font-bold">Settings</h2>
        </div>
      </MainLayout>
    </LayoutContainer>
  );
}

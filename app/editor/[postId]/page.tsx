import { EditorOperation } from "@/components/editorOperation";
import { LayoutContainer } from "@/components/layout/layout/container";
import { MainLayout } from "@/components/layout/mainLayout";

type EditorPagePropsType = {
  params: Promise<{ postId: string }>;
};

export default async function EditorPage({ params }: EditorPagePropsType) {
  const { postId } = await params;

  return (
    <LayoutContainer>
      <MainLayout>
        <EditorOperation postId={postId} />
      </MainLayout>
    </LayoutContainer>
  );
}

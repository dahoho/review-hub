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
        <div className="px-5 mt-14">
          <EditorOperation postId={postId} />
        </div>
      </MainLayout>
    </LayoutContainer>
  );
}

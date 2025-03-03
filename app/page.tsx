import { LayoutContainer } from "@/components/layout/layout/container";
import { MainLayout } from "@/components/layout/mainLayout";
import { PostList } from "@/components/postList";
import { fetchPosts } from "@/service/postService";

export default async function Home() {
  const post = await fetchPosts();

  return (
    <>
      <LayoutContainer>
        <MainLayout>
          <PostList post={post} />
        </MainLayout>
      </LayoutContainer>
    </>
  );
}

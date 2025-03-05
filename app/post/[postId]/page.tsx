import { CommentForm } from "@/components/commentForm";
import { CommentList } from "@/components/commentList/CommentList";
import { LayoutContainer } from "@/components/layout/layout/container";
import { MainLayout } from "@/components/layout/mainLayout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATE_FORMAT } from "@/constans";
import { getCurrentUser } from "@/lib/session";
import { fetchCommentsByPostId } from "@/service/commentService";
import { fetchPostById } from "@/service/postService";
import dayjs from "dayjs";

import { notFound } from "next/navigation";

type PostDetailPageProps = {
  params: Promise<{ postId: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { postId } = await params;
  const post = await fetchPostById(postId);
  // ユーザーのセッション情報を取得
  const user = await getCurrentUser();

  // 記事が見つからなかった場合、404 ページを表示
  if (!post) notFound();

  const comments = await fetchCommentsByPostId(postId);

  return (
    <LayoutContainer>
      <MainLayout>
        <div className="px-5 py-12">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={post.author.image} alt={post.author.name} />
            </Avatar>
            <p className="text-sm">{post.author.name}</p>
          </div>
          <time
            dateTime={dayjs(post.createdAt).format(DATE_FORMAT)}
            className="text-md text-gray-500 mt-4 block"
          >
            {dayjs(post.createdAt).format("DATE_FORMAT")}
          </time>
          <h2 className="text-3xl font-bold mt-6">{post.title}</h2>
          <ul className="flex items-center gap-2 mt-4">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="outline">{tag}</Badge>
              </li>
            ))}
          </ul>
          <div
            className="prose mt-12"
            dangerouslySetInnerHTML={{ __html: String(post.content) }}
          />
        </div>
        {/* コメント一覧 */}
        <section className="mt-12 px-5">
          <h3 className="text-2xl font-bold mb-4">コメント</h3>
          {comments.length === 0 ? (
            <p>コメントはまだありません。</p>
          ) : (
            <ul className="mt-12 flex flex-col gap-12">
              {comments.map((comment) => (
                <CommentList
                  key={comment.id}
                  initialComment={comment}
                  user={user}
                  post={post}
                />
              ))}
            </ul>
          )}
          <div className="mt-12">
            <CommentForm postId={postId} />
          </div>
        </section>
      </MainLayout>
    </LayoutContainer>
  );
}

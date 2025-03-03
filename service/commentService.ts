import { db } from "@/lib/prisma";

// 投稿IDに紐づくコメントを取得
export const fetchCommentsByPostId = async (postId: string) => {
  return await db.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

// コメントを作成する関数
export const createComment = async (
  postId: string,
  authorId: string,
  content: string
) => {
  return await db.comment.create({
    data: {
      content,
      postId,
      authorId,
    },
    include: {
      author: {
        select: { name: true, image: true },
      },
    },
  });
};

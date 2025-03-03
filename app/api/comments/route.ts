import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const commentCreateSchema = z.object({
  postId: z.string(),
  content: z.string(),
});

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user) return NextResponse.json("Unauthorized", { status: 401 });

  try {
    const json = await req.json();
    const { postId, content } = commentCreateSchema.parse(json);

    const comment = await db.comment.create({
      data: {
        content,
        postId,
        authorId: user.id ?? "",
      },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    });

    // 投稿のコメント数を更新
    await db.post.update({
      where: { id: postId },
      data: { numberOfAnswers: { increment: 1 } },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}

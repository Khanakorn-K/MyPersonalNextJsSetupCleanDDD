import { Session } from "./../../../generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { success: false, message: "Post ID is required" },
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  try {
    const body = await request.json();
    const { postId, content, name } = body;

    if (!session) {
      return NextResponse.json(
        { success: false, message: "No auth" },
        { status: 400 }
      );
    }
    if (!postId || !content) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const commentName = name || session?.user?.name || "Anonymous";
    const commentEmail = session?.user?.email || null;

    const newComment = await prisma.comment.create({
      data: {
        postId,
        content,
        name: commentName,
        email: commentEmail,
      },
    });

    return NextResponse.json({
      success: true,
      data: newComment,
      message: "Comment added",
    });
  } catch (error) {
    // 3. ต้อง log error เสมอ ไม่งั้นเราจะไม่รู้ว่าพังตรงไหน (เช่น foreign key ผิด)
    console.error("Error creating comment:", error);

    return NextResponse.json(
      { success: false, message: "Failed to add comment" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // ตรวจสอบสิทธิ์ Admin (Authorization)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Comment ID is required" },
        { status: 400 }
      );
    }

    await prisma.comment.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Comment deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete comment" },
      { status: 500 }
    );
  }
}

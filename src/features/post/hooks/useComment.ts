import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { CommentsEntity } from "../entity/CommentsEntity";
import { CommentRequestModel } from "../models/CommentRequestModel";
import { CommentDataSource } from "../services/CommentDataSource";

export const useComment = ({ postId }: { postId: string }) => {
  const { data: session } = useSession();

  // เปลี่ยน Type ให้ตรงกับ Entity ที่ DataSource ส่งกลับมา
  const [comments, setComments] = useState<CommentsEntity[]>([]);
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchComments = useCallback(async () => {
    if (!postId) return;
    try {
      setIsLoading(true);
      const result = await CommentDataSource.getCommentsByPostId(postId);
      setComments(result);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      // เตรียมข้อมูลตาม Model
      const payload: CommentRequestModel = {
        content,
        name: session?.user.name ?? "",
        postId,
      };

      // เรียกใช้ DataSource
      await CommentDataSource.createComment(payload);

      setContent("");
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("ต้องการลบความคิดเห็นนี้ใช่หรือไม่?")) return;
    try {
      // เรียกใช้ DataSource
      await CommentDataSource.deleteComment(commentId);
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return {
    comments,
    content,
    setContent,
    name,
    setName,
    isLoading,
    isSubmitting,
    handleSubmit,
    handleDelete,
    session,
  };
};

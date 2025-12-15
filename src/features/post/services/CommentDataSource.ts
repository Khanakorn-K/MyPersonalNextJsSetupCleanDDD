import { SuccessWithDataModelResponse } from "@/model/SuccessModelResponse";
import { apiClient } from "../../../lib/api-client";
import { ApiResponse } from "../../../types/api";
import { CommentsEntity } from "../entity/CommentsEntity";
import { CommentRequestModel } from "../models/CommentRequestModel";
import { CommentResponseModel } from "../models/CommentResponseModel";

export const CommentDataSource = {
  getCommentsByPostId: async (postId: string): Promise<CommentsEntity[]> => {
    const response = await apiClient.get<ApiResponse<CommentResponseModel[]>>(
      "/comments",
      {
        params: { postId: postId },
      }
    );
    return response.data.map((item) => new CommentsEntity(item));
  },

  // สร้างคอมเมนต์ใหม่
  createComment: async (
    data: CommentRequestModel
  ): Promise<SuccessWithDataModelResponse> => {
    const response = await apiClient.post<SuccessWithDataModelResponse>(
      "/comments",
      data
    );
    return response;
  },

  // ลบคอมเมนต์ (สำหรับ Admin)
  deleteComment: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>("/comments", {
      params: { id },
    });
  },
};

import { CommentResponseModel } from "../models/CommentResponseModel";

export class CommentsEntity {
  id: string;
  content: string;
  createdAt: string;
  email: string;
  name: string;
  postId: string;
  constructor(commentResponseModel: CommentResponseModel) {
    this.id = commentResponseModel.id;
    this.content = commentResponseModel.content;
    this.createdAt = commentResponseModel.createdAt;
    this.email = commentResponseModel.email ?? "";
    this.name = commentResponseModel.name;
    this.postId = commentResponseModel.postId;
  }
}

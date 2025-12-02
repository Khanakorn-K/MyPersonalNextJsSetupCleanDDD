import { formatDate } from "./../../../utils/date";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { PostListResponseResutlModel } from "../models/PostListResponseModel";
import { Category } from "@/generated/prisma/client";

export class PostListentity {
  id: string;
  authorId: string;
  content: string;
  coverImage: string;
  createdAt: string;
  excerpt: string;
  published: boolean;
  publishedAt: string;
  slug: string;
  title: string;
  updateAt: string;
  authorName: string;
  authorImage: string;
  categories: Category[];
  tags: Category[];

  constructor(postListResponseModel: PostListResponseResutlModel) {
    this.id = postListResponseModel.id ?? "noPost Id";
    this.authorId = postListResponseModel.authorId ?? "noAuthor Id";
    this.content = postListResponseModel.content ?? "no Content";
    this.coverImage =
      postListResponseModel.coverImage ?? "https://picsum.photos/200/300";
    this.createdAt = postListResponseModel.createdAt ?? "noDate";
    this.excerpt = postListResponseModel.excerpt ?? "noExcerpt";
    this.published = postListResponseModel.published ?? false;
    this.publishedAt = postListResponseModel.publishedAt ?? "no publishedAt";
    this.slug = postListResponseModel.slug ?? "no Slug";
    this.title = postListResponseModel.title ?? "no Title";
    this.updateAt = postListResponseModel.updatedAt ?? "no Update";
    this.authorName = postListResponseModel.author?.name ?? "no name";
    this.authorImage = postListResponseModel.author?.image ?? "author Image";
    this.categories = postListResponseModel.categories;
    this.tags = postListResponseModel.tags;
  }

  get displayDisplayCreateAt(): string {
    return formatDate(this.createdAt);
  }
}

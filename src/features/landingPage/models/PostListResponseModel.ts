export interface PostListResponseModel {
  success: boolean;
  data: PostListResponseResutlModel[];
}

export interface PostListResponseResutlModel {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  publishedAt: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  categories: Category[];
  tags: Category[];
}

export interface Author {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

// book-type.ts
export type BookOutput = {
  _id: string;
  id: string;
  author: string;
  cover_image: string;
  description: string;
  title: string;
  url: string;
  categories: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
};

export type BookInput = {
  id: string;
  author: string;
  cover_image: string;
  description: string;
  title: string;
  url: string;
  categories: string;
  status: number;
};

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

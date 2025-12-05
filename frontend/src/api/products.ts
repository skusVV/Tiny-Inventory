import { api } from "./client";
import type { Product, PaginatedResponse } from "./types";

export interface ProductPayload {
    name: string;
    description: string;
    quantity: number;
    price: number;
    imageUrl: string;
    storeId: string;
    categoryIds: string[];
}

export type ProductSortBy = 'name' | 'price' | 'createdAt';
export type SortOrder = 'ASC' | 'DESC';

export interface ListProductsParams {
    sortBy?: ProductSortBy;
    sortOrder?: SortOrder;
    skip?: number;
    take?: number;
}

export const ProductsApi = {
  getAll: (params: ListProductsParams = {}) => {
    const searchParams = new URLSearchParams();

    if (params.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);
    if (params.skip !== undefined) searchParams.set('skip', params.skip.toString());
    if (params.take !== undefined) searchParams.set('take', params.take.toString());

    const query = searchParams.toString();

    return api.get<PaginatedResponse<Product>>(`/products${query ? `?${query}` : ''}`);
  },
  list: (storeId: string) => api.get<Product[]>(`/stores/${storeId}/products`),
  get: (id: string) => api.get<Product>(`/products/${id}`),
  create: (payload: ProductPayload) => api.post<Product>("/products", payload),
  update: (id: string, payload: Partial<ProductPayload>) => api.patch<Product>(`/products/${id}`, payload),
  remove: (id: string) => api.delete<void>(`/products/${id}`),
};


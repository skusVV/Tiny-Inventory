import { api } from "./client";
import type { Product } from "./types";

export interface ProductPayload {
    name: string;
    description: string;
    quantity: number;
    price: number;
    imageUrl: string;
    storeId: string;
    categoryIds: string[];
}

export type ProductSortBy = 'name' | 'price' | 'quantity' | 'createdAt';
export type SortOrder = 'ASC' | 'DESC';

export const ProductsApi = {
  list: (storeId: string, sortBy?: ProductSortBy, sortOrder?: SortOrder) => {
    const params = new URLSearchParams();

    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);

    const query = params.toString();

    return api.get<Product[]>(`/stores/${storeId}/products${query ? `?${query}` : ''}`);
  },
  get: (id: string) => api.get<Product>(`/products/${id}`),
  create: (payload: ProductPayload) => api.post<Product>("/products", payload),
  update: (id: string, payload: Partial<ProductPayload>) => api.patch<Product>(`/products/${id}`, payload),
  remove: (id: string) => api.delete<void>(`/products/${id}`),
};


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

export const ProductsApi = {
  getAll: () => api.get<Product[]>("/products"),
  list: (storeId: string) => api.get<Product[]>(`/stores/${storeId}/products`),
  get: (id: string) => api.get<Product>(`/products/${id}`),
  create: (payload: ProductPayload) => api.post<Product>("/products", payload),
  update: (id: string, payload: Partial<ProductPayload>) => api.patch<Product>(`/products/${id}`, payload),
  remove: (id: string) => api.delete<void>(`/products/${id}`),
};


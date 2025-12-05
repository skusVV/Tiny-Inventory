import { api } from "./client";
import type { Store } from "./types";

export interface StorePayload {
    name: string;
    description: string;
    logoUrl: string;
    location: string;
}

export type StoreSortBy = 'name' | 'createdAt';
export type SortOrder = 'ASC' | 'DESC';

export const StoresApi = {
  list: (sortBy?: StoreSortBy, sortOrder?: SortOrder) => {
    const params = new URLSearchParams();

    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);

    const query = params.toString();

    return api.get<Store[]>(`/stores${query ? `?${query}` : ''}`);
  },
  get: (id: string) => api.get<Store>(`/stores/${id}`),
  create: (payload: StorePayload) => api.post<Store>("/stores", payload),
  update: (id: string, payload: StorePayload) => api.patch<Store>(`/stores/${id}`, payload),
  remove: (id: string) => api.delete<void>(`/stores/${id}`),
};
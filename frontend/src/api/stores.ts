import { api } from "./client";
import type { Store, StoreOption, PaginatedResponse } from "./types";

export interface StorePayload {
    name: string;
    description: string;
    logoUrl: string;
    location: string;
}

export type StoreSortBy = 'name' | 'createdAt';
export type SortOrder = 'ASC' | 'DESC';

export interface ListStoresParams {
    sortBy?: StoreSortBy;
    sortOrder?: SortOrder;
    skip?: number;
    take?: number;
}

export const StoresApi = {
  list: (params: ListStoresParams = {}) => {
    const searchParams = new URLSearchParams();

    if (params.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);
    if (params.skip !== undefined) searchParams.set('skip', params.skip.toString());
    if (params.take !== undefined) searchParams.set('take', params.take.toString());

    const query = searchParams.toString();

    return api.get<PaginatedResponse<Store>>(`/stores${query ? `?${query}` : ''}`);
  },
  options: () => api.get<StoreOption[]>('/stores/options'),
  get: (id: string) => api.get<Store>(`/stores/${id}`),
  create: (payload: StorePayload) => api.post<Store>("/stores", payload),
  update: (id: string, payload: StorePayload) => api.patch<Store>(`/stores/${id}`, payload),
  remove: (id: string) => api.delete<void>(`/stores/${id}`),
};
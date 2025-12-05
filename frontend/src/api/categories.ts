import { api } from "./client";
import type { Category } from "./types";

export const CategoriesApi = {
  list: () => api.get<Category[]>("/categories"),
};


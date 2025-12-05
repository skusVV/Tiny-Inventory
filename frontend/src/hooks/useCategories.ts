import { useEffect, useState } from "react";
import { CategoriesApi } from "../api/categories";
import type { Category } from "../api/types";

export function useCategories() {
  const [data, setData] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const categories = await CategoriesApi.list();

        if (!cancel) setData(categories);
      } catch (e) {
        if (!cancel) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    load();

    return () => { cancel = true; };
  }, []);

  return { data, loading, error };
}


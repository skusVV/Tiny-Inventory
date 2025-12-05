import { useEffect, useState } from "react";
import { StoresApi, type StoreSortBy, type SortOrder } from "../api/stores";
import type { Store } from "../api/types";

interface UseStoresOptions {
  sortBy?: StoreSortBy;
  sortOrder?: SortOrder;
}

export function useStores(options: UseStoresOptions = {}) {
  const { sortBy, sortOrder } = options;
  const [data, setData] = useState<Store[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const stores = await StoresApi.list(sortBy, sortOrder);

        if (!cancel) setData(stores);
      } catch (e) {
        if (!cancel) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    load();

    return () => { cancel = true };
  }, [sortBy, sortOrder]);

  return { data, loading, error };
}
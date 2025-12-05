import { useCallback, useEffect, useState } from "react";
import { StoresApi, type StoreSortBy, type SortOrder } from "../api/stores";
import type { Store } from "../api/types";

const PAGE_SIZE = 9;

interface UseStoresOptions {
  sortBy?: StoreSortBy;
  sortOrder?: SortOrder;
}

export function useStores(options: UseStoresOptions = {}) {
  const { sortBy, sortOrder } = options;
  const [stores, setStores] = useState<Store[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasMore = stores.length < totalCount;

  useEffect(() => {
    let cancel = false;

    async function loadInitial() {
      try {
        setLoading(true);
        setError(null);
        const response = await StoresApi.list({ sortBy, sortOrder, skip: 0, take: PAGE_SIZE });

        if (!cancel) {
          setStores(response.items);
          setTotalCount(response.totalCount);
        }
      } catch (e) {
        if (!cancel) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    loadInitial();

    return () => { cancel = true };
  }, [sortBy, sortOrder]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const response = await StoresApi.list({
        sortBy,
        sortOrder,
        skip: stores.length,
        take: PAGE_SIZE,
      });

      setStores((prev) => [...prev, ...response.items]);
      setTotalCount(response.totalCount);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoadingMore(false);
    }
  }, [sortBy, sortOrder, stores.length, loadingMore, hasMore]);

  return { stores, totalCount, loading, loadingMore, error, hasMore, loadMore };
}
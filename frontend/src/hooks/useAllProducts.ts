import { useCallback, useEffect, useState } from "react";
import { ProductsApi, type ProductSortBy, type SortOrder } from "../api/products";
import type { Product } from "../api/types";

const PAGE_SIZE = 6;

interface UseAllProductsOptions {
  sortBy?: ProductSortBy;
  sortOrder?: SortOrder;
}

export function useAllProducts(options: UseAllProductsOptions = {}) {
  const { sortBy, sortOrder } = options;
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasMore = products.length < totalCount;

  useEffect(() => {
    let cancel = false;

    async function loadInitial() {
      try {
        setLoading(true);
        setError(null);
        const response = await ProductsApi.getAll({ sortBy, sortOrder, skip: 0, take: PAGE_SIZE });

        if (!cancel) {
          setProducts(response.items);
          setTotalCount(response.totalCount);
        }
      } catch (e) {
        if (!cancel) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    loadInitial();

    return () => { cancel = true; };
  }, [sortBy, sortOrder]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const response = await ProductsApi.getAll({
        sortBy,
        sortOrder,
        skip: products.length,
        take: PAGE_SIZE,
      });

      setProducts((prev) => [...prev, ...response.items]);
      setTotalCount(response.totalCount);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoadingMore(false);
    }
  }, [sortBy, sortOrder, products.length, loadingMore, hasMore]);

  return { products, totalCount, loading, loadingMore, error, hasMore, loadMore };
}

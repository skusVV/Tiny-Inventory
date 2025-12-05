import { useEffect, useState } from "react";
import { ProductsApi } from "../api/products";
import type { Product } from "../api/types";

export function useProducts(storeId: string | undefined) {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storeId) {
      setLoading(false);

      return;
    }

    let cancel = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const products = await ProductsApi.list(storeId!);

        if (!cancel) setData(products);
      } catch (e) {
        if (!cancel) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    load();

    return () => { cancel = true; };
  }, [storeId]);

  return { data, loading, error };
}

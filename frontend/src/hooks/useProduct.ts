import { useEffect, useState } from "react";
import { ProductsApi } from "../api/products";
import type { Product } from "../api/types";

export function useProduct(id: string | undefined) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);

      return;
    }

    let cancel = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const product = await ProductsApi.get(id!);

        if (!cancel) setData(product);
      } catch (e) {
        if (!cancel) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    load();

    return () => { cancel = true; };
  }, [id]);

  return { data, loading, error };
}


import { useEffect, useState } from "react";
import { StoresApi } from "../api/stores";
import type { Store } from "../api/types";

export function useStore(id: string | undefined) {
  const [data, setData] = useState<Store | null>(null);
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
        const store = await StoresApi.get(id!);

        if (!cancel) setData(store);
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


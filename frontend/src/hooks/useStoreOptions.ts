import { useEffect, useState } from "react";
import { StoresApi } from "../api/stores";
import type { StoreOption } from "../api/types";

export function useStoreOptions() {
  const [data, setData] = useState<StoreOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const options = await StoresApi.options();

        if (!cancel) {
          setData(options);
        }
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


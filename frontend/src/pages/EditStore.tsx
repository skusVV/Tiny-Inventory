import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../hooks/useStore";
import { StoresApi } from "../api/stores";
import { StoreForm, Loader, ErrorMessage } from "../components";
import type { StoreFormData } from "../components";
import { buildStoreRoute } from "../shared";

export const EditStore = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: store, loading, error } = useStore(id);

  const initialData = useMemo<StoreFormData | undefined>(() => {
    if (!store) return undefined;

    return {
      name: store.name,
      description: store.description ?? "",
      logoUrl: store.logoUrl ?? "",
      location: store.location ?? "",
    };
  }, [store]);

  const handleSubmit = async (data: StoreFormData) => {
    if (!id) return;

    await StoresApi.update(id, data);
    navigate(buildStoreRoute(id));
  };

  if (loading) {
    return <Loader className="py-20" />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!store) {
    return <div className="text-slate-400">Store not found</div>;
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-medium text-slate-700 mb-8">Edit Store</h1>

      <StoreForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        loadingLabel="Saving..."
      />
    </div>
  );
};


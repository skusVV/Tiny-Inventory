import { useNavigate } from "react-router-dom";
import { StoresApi } from "../api/stores";
import { StoreForm } from "../components";
import type { StoreFormData } from "../components";
import { buildStoreRoute } from "../shared";

export const CreateStore = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: StoreFormData) => {
    const store = await StoresApi.create(data);

    navigate(buildStoreRoute(store.id));
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-medium text-slate-700 mb-8">Create Store</h1>

      <StoreForm
        onSubmit={handleSubmit}
        submitLabel="Create Store"
        loadingLabel="Creating..."
      />
    </div>
  );
};

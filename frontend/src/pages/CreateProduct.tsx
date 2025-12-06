import { useNavigate, useParams } from "react-router-dom";
import { ProductsApi } from "../api/products";
import { ProductForm } from "../components";
import type { ProductFormData } from "../components";
import { buildStoreRoute } from "../shared";

export const CreateProduct = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (data: ProductFormData) => {
    await ProductsApi.create({
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity, 10),
      imageUrl: data.imageUrl,
      storeId: data.storeId,
      categoryIds: data.categoryIds,
    });

    navigate(buildStoreRoute(data.storeId));
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-medium text-slate-700 mb-8">Create Product</h1>

      <ProductForm
        defaultStoreId={storeId}
        onSubmit={handleSubmit}
        submitLabel="Create Product"
        loadingLabel="Creating..."
      />
    </div>
  );
};

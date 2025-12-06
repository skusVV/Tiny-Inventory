import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { ProductsApi } from "../api/products";
import { ProductForm } from "../components";
import type { ProductFormData } from "../components";
import { buildProductRoute } from "../shared";

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, loading, error } = useProduct(id);

  const initialData = useMemo<ProductFormData | undefined>(() => {
    if (!product) return undefined;

    return {
      name: product.name,
      description: product.description ?? "",
      price: String(product.price),
      quantity: String(product.quantity),
      imageUrl: product.imageUrl ?? "",
      storeId: product.storeId,
      categoryIds: product.categories.map((c) => c.id),
    };
  }, [product]);

  const handleSubmit = async (data: ProductFormData) => {
    if (!id) return;

    await ProductsApi.update(id, {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity, 10),
      imageUrl: data.imageUrl,
      storeId: data.storeId,
      categoryIds: data.categoryIds,
    });

    navigate(buildProductRoute(id));
  };

  if (loading) {
    return <div className="text-slate-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-slate-400">Product not found</div>;
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-medium text-slate-700 mb-8">Edit Product</h1>

      <ProductForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        loadingLabel="Saving..."
        disableStoreChange
      />
    </div>
  );
};


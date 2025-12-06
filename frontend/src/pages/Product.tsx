import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { ProductsApi } from "../api/products";
import { ConfirmDialog, Loader, ErrorMessage } from "../components";
import { buildStoreRoute, buildEditProductRoute } from "../shared";

export const Product = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, loading, error } = useProduct(id);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    if (!id || !product) return;

    setDeleting(true);
    try {
      await ProductsApi.remove(id);
      navigate(buildStoreRoute(product.storeId));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete product");
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return <Loader className="py-20" />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!product) {
    return <div className="text-slate-400">Product not found</div>;
  }

  return (
    <div>
      <div className="flex items-start gap-6 mb-8">
        <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl font-medium text-slate-300">
              {product.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-medium text-slate-700">{product.name}</h1>

              {product.description && (
                <p className="text-slate-400 mt-2">{product.description}</p>
              )}

              <div className="flex items-center gap-6 mt-4">
                <div>
                  <span className="text-2xl font-semibold text-teal-600">${product.price}</span>
                </div>
                <div className="text-slate-500">
                  <span className="font-medium">{product.quantity}</span> in stock
                </div>
              </div>

              {product.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.categories.map((category) => (
                    <span
                      key={category.id}
                      className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-1">
              <button
                onClick={() => navigate(buildEditProductRoute(id!))}
                className="p-2 text-slate-400 hover:text-teal-500 hover:bg-teal-50 rounded-lg transition-colors"
                title="Edit product"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={deleting}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                title="Delete product"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>
            </div>

            <ConfirmDialog
              isOpen={showDeleteConfirm}
              title="Delete Product"
              message="Are you sure you want to delete this product? This action cannot be undone."
              onConfirm={handleDelete}
              onCancel={() => setShowDeleteConfirm(false)}
              isLoading={deleting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

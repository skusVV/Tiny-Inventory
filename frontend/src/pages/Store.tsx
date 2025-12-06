import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../hooks/useStore";
import { useProducts } from "../hooks/useProducts";
import { StoresApi } from "../api/stores";
import { ProductList, ConfirmDialog } from "../components";
import { ROUTES, buildCreateProductRoute, buildEditStoreRoute } from "../shared";

export const Store = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: store, loading, error } = useStore(id);
  const { data: products, loading: productsLoading } = useProducts(id);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    if (!id) return;

    setDeleting(true);
    try {
      await StoresApi.remove(id);
      navigate(ROUTES.HOME);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete store");
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return <div className="text-slate-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!store) {
    return <div className="text-slate-400">Store not found</div>;
  }

  return (
    <div>
      <div className="flex items-start gap-6 mb-8">
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0">
          {store.logoUrl ? (
            <img
              src={store.logoUrl}
              alt={store.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-medium text-slate-300">
              {store.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-medium text-slate-700">{store.name}</h1>

              {store.description && (
                <p className="text-slate-400 mt-2">{store.description}</p>
              )}

              {store.location && (
                <p className="text-sm text-slate-400 mt-2">📍 {store.location}</p>
              )}

              {store.topCategories && store.topCategories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {store.topCategories.map((cat) => (
                    <span
                      key={cat.id}
                      className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs rounded-full"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-1">
              <button
                onClick={() => navigate(buildEditStoreRoute(id!))}
                className="p-2 text-slate-400 hover:text-teal-500 hover:bg-teal-50 rounded-lg transition-colors"
                title="Edit store"
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
                title="Delete store"
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
              title="Delete Store"
              message="Are you sure you want to delete this store? This action cannot be undone."
              onConfirm={handleDelete}
              onCancel={() => setShowDeleteConfirm(false)}
              isLoading={deleting}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200/60 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-slate-700">Products</h2>
          <button
            onClick={() => navigate(buildCreateProductRoute(id!))}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
          >
            Create Product
          </button>
        </div>

        {productsLoading ? (
          <p className="text-slate-400">Loading products...</p>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </div>
  );
};

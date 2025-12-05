import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsApi } from "../api/products";
import { useCategories } from "../hooks/useCategories";
import { useStoreOptions } from "../hooks/useStoreOptions";
import { buildStoreRoute } from "../shared";

export const CreateProduct = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const { data: categories, loading: categoriesLoading } = useCategories();
  const { data: stores, loading: storesLoading } = useStoreOptions();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState(storeId || "");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFormValid =
    name.trim() &&
    description.trim() &&
    price &&
    quantity &&
    imageUrl.trim() &&
    selectedStoreId &&
    categoryIds.length > 0;

  const handleCategoryToggle = (id: string) => {
    setCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setLoading(true);
    setError(null);

    try {
      await ProductsApi.create({
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        imageUrl: imageUrl.trim(),
        storeId: selectedStoreId,
        categoryIds,
      });

      navigate(buildStoreRoute(selectedStoreId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product");
      setLoading(false);
    }
  };

  const isDataLoading = categoriesLoading || storesLoading;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-medium text-slate-700 mb-8">Create Product</h1>

      {isDataLoading ? (
        <div className="text-slate-400">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-2">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-600 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your product"
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-600 mb-2">
                Price
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-slate-600 mb-2">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-600 mb-2">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.png"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="store" className="block text-sm font-medium text-slate-600 mb-2">
              Store
            </label>
            <select
              id="store"
              value={selectedStoreId}
              onChange={(e) => setSelectedStoreId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all bg-white"
            >
              <option value="">Select a store</option>
              {stores?.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Categories
            </label>
            <div className="border border-slate-200 rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
              {categories?.length === 0 && (
                <p className="text-slate-400 text-sm">No categories available</p>
              )}
              {categories?.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={categoryIds.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="w-4 h-4 rounded border-slate-300 text-teal-500 focus:ring-teal-400"
                  />
                  <span className="text-slate-700">{category.name}</span>
                </label>
              ))}
            </div>
            {categoryIds.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {categoryIds.map((id) => {
                  const category = categories?.find((c) => c.id === id);

                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-teal-50 text-teal-700 text-sm rounded-md"
                    >
                      {category?.name}
                      <button
                        type="button"
                        onClick={() => handleCategoryToggle(id)}
                        className="hover:text-teal-900"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="w-full px-4 py-3 bg-teal-500 text-white rounded-lg font-medium transition-all disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-teal-600"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      )}
    </div>
  );
};


import { useState, useEffect, useMemo } from "react";
import { useCategories } from "../hooks/useCategories";
import { useStoreOptions } from "../hooks/useStoreOptions";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  quantity: string;
  imageUrl: string;
  storeId: string;
  categoryIds: string[];
}

interface ProductFormProps {
  initialData?: ProductFormData;
  defaultStoreId?: string;
  onSubmit: (data: ProductFormData) => Promise<void>;
  submitLabel: string;
  loadingLabel: string;
  disableStoreChange?: boolean;
}

const createEmptyFormData = (storeId = ""): ProductFormData => ({
  name: "",
  description: "",
  price: "",
  quantity: "",
  imageUrl: "",
  storeId,
  categoryIds: [],
});

export const ProductForm = ({
  initialData,
  defaultStoreId,
  onSubmit,
  submitLabel,
  loadingLabel,
  disableStoreChange = false,
}: ProductFormProps) => {
  const { data: categories, loading: categoriesLoading } = useCategories();
  const { data: stores, loading: storesLoading } = useStoreOptions();

  const [formData, setFormData] = useState<ProductFormData>(
    initialData ?? createEmptyFormData(defaultStoreId)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const isFormValid =
    formData.name.trim() &&
    formData.description.trim() &&
    formData.price &&
    formData.quantity &&
    formData.imageUrl.trim() &&
    formData.storeId &&
    formData.categoryIds.length > 0;

  const hasChanges = useMemo(() => {
    if (!initialData) return true;

    const categoryIdsMatch =
      formData.categoryIds.length === initialData.categoryIds.length &&
      formData.categoryIds.every((id) => initialData.categoryIds.includes(id));

    return (
      formData.name.trim() !== (initialData.name ?? "").trim() ||
      formData.description.trim() !== (initialData.description ?? "").trim() ||
      formData.price !== initialData.price ||
      formData.quantity !== initialData.quantity ||
      formData.imageUrl.trim() !== (initialData.imageUrl ?? "").trim() ||
      formData.storeId !== initialData.storeId ||
      !categoryIdsMatch
    );
  }, [formData, initialData]);

  const canSubmit = isFormValid && hasChanges;

  const handleCategoryToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(id)
        ? prev.categoryIds.filter((cid) => cid !== id)
        : [...prev.categoryIds, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    try {
      await onSubmit({
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: formData.price,
        quantity: formData.quantity,
        imageUrl: formData.imageUrl.trim(),
        storeId: formData.storeId,
        categoryIds: formData.categoryIds,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  const updateField = (field: keyof ProductFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isDataLoading = categoriesLoading || storesLoading;

  if (isDataLoading) {
    return <Loader className="py-20" />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-2">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={updateField("name")}
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
          value={formData.description}
          onChange={updateField("description")}
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
            value={formData.price}
            onChange={updateField("price")}
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
            value={formData.quantity}
            onChange={updateField("quantity")}
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
          value={formData.imageUrl}
          onChange={updateField("imageUrl")}
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
          value={formData.storeId}
          onChange={updateField("storeId")}
          disabled={disableStoreChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
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
                checked={formData.categoryIds.includes(category.id)}
                onChange={() => handleCategoryToggle(category.id)}
                className="w-4 h-4 rounded border-slate-300 text-teal-500 focus:ring-teal-400"
              />
              <span className="text-slate-700">{category.name}</span>
            </label>
          ))}
        </div>
        {formData.categoryIds.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.categoryIds.map((id) => {
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

      {error && <ErrorMessage message={error} centered={false} />}

      <button
        type="submit"
        disabled={!canSubmit || loading}
        className="w-full px-4 py-3 bg-teal-500 text-white rounded-lg font-medium transition-all disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-teal-600"
      >
        {loading ? loadingLabel : submitLabel}
      </button>
    </form>
  );
};


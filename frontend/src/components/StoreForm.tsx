import { useState, useEffect, useMemo } from "react";

export interface StoreFormData {
  name: string;
  description: string;
  logoUrl: string;
  location: string;
}

interface StoreFormProps {
  initialData?: StoreFormData;
  onSubmit: (data: StoreFormData) => Promise<void>;
  submitLabel: string;
  loadingLabel: string;
}

const emptyFormData: StoreFormData = {
  name: "",
  description: "",
  logoUrl: "",
  location: "",
};

export const StoreForm = ({
  initialData,
  onSubmit,
  submitLabel,
  loadingLabel,
}: StoreFormProps) => {
  const [formData, setFormData] = useState<StoreFormData>(initialData ?? emptyFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const isFormValid = formData.name.trim() && formData.description.trim() && formData.logoUrl.trim() && formData.location.trim();

  const hasChanges = useMemo(() => {
    if (!initialData) return true;

    return (
      formData.name.trim() !== (initialData.name ?? "").trim() ||
      formData.description.trim() !== (initialData.description ?? "").trim() ||
      formData.logoUrl.trim() !== (initialData.logoUrl ?? "").trim() ||
      formData.location.trim() !== (initialData.location ?? "").trim()
    );
  }, [formData, initialData]);

  const canSubmit = isFormValid && hasChanges;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    try {
      await onSubmit({
        name: formData.name.trim(),
        description: formData.description.trim(),
        logoUrl: formData.logoUrl.trim(),
        location: formData.location.trim(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  const updateField = (field: keyof StoreFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-2">
          Store Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={updateField("name")}
          placeholder="Enter store name"
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
          placeholder="Describe your store"
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all resize-none"
        />
      </div>

      <div>
        <label htmlFor="logoUrl" className="block text-sm font-medium text-slate-600 mb-2">
          Logo URL
        </label>
        <input
          id="logoUrl"
          type="url"
          value={formData.logoUrl}
          onChange={updateField("logoUrl")}
          placeholder="https://example.com/logo.png"
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-slate-600 mb-2">
          Location
        </label>
        <input
          id="location"
          type="text"
          value={formData.location}
          onChange={updateField("location")}
          placeholder="City, Country"
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

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


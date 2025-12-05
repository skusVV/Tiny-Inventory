import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoresApi } from "../api/stores";
import { buildStoreRoute } from "../shared";

export const CreateStore = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFormValid = name.trim() && description.trim() && logoUrl.trim() && location.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setLoading(true);
    setError(null);

    try {
      const store = await StoresApi.create({
        name: name.trim(),
        description: description.trim(),
        logoUrl: logoUrl.trim(),
        location: location.trim(),
      });

      navigate(buildStoreRoute(store.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create store");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-medium text-slate-700 mb-8">Create Store</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-2">
            Store Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, Country"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className="w-full px-4 py-3 bg-teal-500 text-white rounded-lg font-medium transition-all disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-teal-600"
        >
          {loading ? "Creating..." : "Create Store"}
        </button>
      </form>
    </div>
  );
};


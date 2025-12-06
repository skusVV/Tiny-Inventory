import { useState } from "react";
import { Link } from "react-router-dom";
import { useAllProducts } from "../hooks/useAllProducts";
import { ProductList, Loader, ErrorMessage } from "../components";
import { ROUTES } from "../shared";
import type { ProductSortBy, SortOrder } from "../api/products";

type SortOption = `${ProductSortBy}:${SortOrder}`;

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name:ASC', label: 'Name (A-Z)' },
  { value: 'name:DESC', label: 'Name (Z-A)' },
  { value: 'price:ASC', label: 'Price (Low to High)' },
  { value: 'price:DESC', label: 'Price (High to Low)' },
  { value: 'createdAt:DESC', label: 'Newest first' },
  { value: 'createdAt:ASC', label: 'Oldest first' },
];

export const AllProducts = () => {
  const [sort, setSort] = useState<SortOption>('name:ASC');
  const [sortBy, sortOrder] = sort.split(':') as [ProductSortBy, SortOrder];
  const { products, totalCount, loading, loadingMore, error, hasMore, loadMore } = useAllProducts({ sortBy, sortOrder });

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium text-slate-700">All Products</h1>
        <Link
          to={ROUTES.CREATE_PRODUCT_GLOBAL}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
        >
          Create Product
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-slate-600">Sort by:</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {!loading && (
          <span className="text-sm text-slate-500">
            Showing {products.length} of {totalCount}
          </span>
        )}
      </div>

      {loading ? (
        <Loader className="py-20" />
      ) : (
        <>
          <ProductList products={products} />

          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium disabled:opacity-50"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};


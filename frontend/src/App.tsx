import { useState } from "react";
import { Link } from "react-router-dom";
import { useStores } from "./hooks/useStores";
import { StoreCardsList } from "./components";
import { ROUTES } from "./shared";
import type { StoreSortBy, SortOrder } from "./api/stores";

type SortOption = `${StoreSortBy}:${SortOrder}`;

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name:ASC', label: 'Name (A-Z)' },
  { value: 'name:DESC', label: 'Name (Z-A)' },
  { value: 'createdAt:DESC', label: 'Newest first' },
  { value: 'createdAt:ASC', label: 'Oldest first' },
];

const App = () => {
  const [sort, setSort] = useState<SortOption>('name:ASC');
  const [sortBy, sortOrder] = sort.split(':') as [StoreSortBy, SortOrder];
  const { stores, totalCount, loading, loadingMore, error, hasMore, loadMore } = useStores({ sortBy, sortOrder });

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium text-slate-700">Your Stores</h1>
        <Link
          to={ROUTES.CREATE_STORE}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
        >
          Create Store
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
            Showing {stores.length} of {totalCount}
          </span>
        )}
      </div>

      {loading ? (
        <div className="text-slate-400">Loading...</div>
      ) : (
        <>
          <StoreCardsList stores={stores} />

          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? 'Loading...' : 'Show More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

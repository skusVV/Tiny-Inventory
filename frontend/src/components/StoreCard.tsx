import { Link } from "react-router-dom";
import type { Store } from "../api/types";
import { buildStoreRoute } from "../shared";

interface StoreCardProps {
  store: Store;
}

export const StoreCard = ({ store }: StoreCardProps) => {
  return (
    <Link
      to={buildStoreRoute(store.id)}
      className="group block bg-white rounded-xl border border-slate-200/60 p-6 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-100/50 transition-all duration-200 min-h-[140px]"
    >
      <div className="flex items-start gap-5">
        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0">
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

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-slate-700 group-hover:text-teal-600 transition-colors truncate">
            {store.name}
          </h3>

          {store.description && (
            <p className="text-sm text-slate-400 mt-1 line-clamp-2">
              {store.description}
            </p>
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
      </div>
    </Link>
  );
};


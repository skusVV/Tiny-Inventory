import type { Store } from "../api/types";
import { StoreCard } from "./StoreCard";

interface StoreCardsListProps {
  stores: Store[];
}

export const StoreCardsList = ({ stores }: StoreCardsListProps) => {
  if (stores.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No stores yet. Create your first store!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
};


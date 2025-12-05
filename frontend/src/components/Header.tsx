import { Link } from "react-router-dom";
import { ROUTES } from "../shared";

export const Header = () => {
  return (
    <header className="bg-slate-200 border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-medium text-slate-700 hover:text-teal-500 transition-colors">
          Tiny Inventory
        </Link>
        <nav className="flex items-center gap-6">
          <Link to={ROUTES.HOME} className="text-slate-600 hover:text-teal-500 transition-colors">
            Stores
          </Link>
          <Link to={ROUTES.ALL_PRODUCTS} className="text-slate-600 hover:text-teal-500 transition-colors">
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
};

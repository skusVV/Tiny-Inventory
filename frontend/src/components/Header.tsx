import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-slate-200 border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link to="/" className="text-xl font-medium text-slate-700 hover:text-teal-500 transition-colors">
          Tiny Inventory
        </Link>
      </div>
    </header>
  );
};

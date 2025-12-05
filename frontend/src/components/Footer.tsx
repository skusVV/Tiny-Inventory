export const Footer = () => {
  return (
    <footer className="bg-slate-200 border-t border-slate-200/60 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-slate-400 font-light">
        © {new Date().getFullYear()} Tiny Inventory
      </div>
    </footer>
  );
};

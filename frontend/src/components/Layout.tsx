import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-slate-50 to-teal-50/30">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

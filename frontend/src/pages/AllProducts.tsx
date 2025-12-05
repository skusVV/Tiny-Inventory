import { Link } from "react-router-dom";
import { useAllProducts } from "../hooks/useAllProducts";
import { ProductList } from "../components";
import { ROUTES } from "../shared";

export const AllProducts = () => {
  const { data: products, loading, error } = useAllProducts();

  if (error) {
    return <div className="text-red-500">{error}</div>;
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

      {loading ? (
        <div className="text-slate-400">Loading...</div>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};


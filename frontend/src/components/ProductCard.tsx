import { Link } from "react-router-dom";
import type { Product } from "../api/types";
import { buildProductRoute } from "../shared";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      to={buildProductRoute(product.id)}
      className="group block bg-white rounded-xl border border-slate-200/60 p-6 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-100/50 transition-all duration-200 min-h-[140px]"
    >
      <div className="flex items-start gap-5">
        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-medium text-slate-300">
              {product.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-slate-700 group-hover:text-teal-600 transition-colors truncate">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-sm text-slate-400 mt-1 line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex items-center gap-4 mt-2">
            <span className="text-teal-600 font-semibold">${product.price}</span>
            <span className="text-sm text-slate-400">Qty: {product.quantity}</span>
          </div>

          {product.categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.categories.map((category) => (
                <span
                  key={category.id}
                  className="px-2 py-0.5 text-xs bg-slate-100 text-slate-500 rounded-full"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};


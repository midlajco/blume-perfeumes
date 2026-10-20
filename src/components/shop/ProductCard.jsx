
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f2ec]">
        <Link to={`/products/${product.id}`} className="block h-full w-full">
          <div className="flex h-full w-full items-center justify-center p-5">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        
      </div>

      <div className="space-y-1 pt-3">
        <h2 className="text-sm font-medium text-stone-900">
          {product.name}
        </h2>

        <p className="text-xs text-stone-500">
          {product.category}
        </p>

        <p className="line-clamp-2 text-xs leading-5 text-stone-500">
          {product.description}
        </p>

        <p className="pt-1 text-sm font-medium text-stone-900">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>
      </div>
    </article>
  );
}

export default ProductCard;

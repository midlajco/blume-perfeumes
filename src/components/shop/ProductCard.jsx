
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  
  return (
    <article className="group">
      <Link to={`/products/${product.id}`} >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#efede7]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-stone-800 hover:bg-white"
        >
          <Heart size={18} strokeWidth={1.5} />
        </button>
      </div>

      <div className="space-y-1 pt-3">
        <h2 className="text-sm font-medium text-stone-800">
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
      </Link>
    </article>
  );
}

export default ProductCard;

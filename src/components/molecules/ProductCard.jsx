import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
// import addToCart from "../../utils/addToCart.js";

function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
      <Link to={`/product/${product.id}`} key={product.id}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            {product.stock > 0 ? (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                In Stock
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

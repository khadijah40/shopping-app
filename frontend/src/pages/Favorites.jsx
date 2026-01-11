import React from "react";
import { useCart } from "../context/CartContext";
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const { favorites, removeFromFavorites, moveToCart } = useCart();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-600 text-lg mb-2">
              You haven't added any favorites yet 🤍
            </p>
            <p className="text-gray-500">
              Start exploring and save what you love.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-all hover:scale-105 font-medium"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {favorites.length} {favorites.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Section */}
              <div className="relative h-64 bg-gray-100 flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Remove Heart Button */}
                <button
                  onClick={() => removeFromFavorites(product.id)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors group/heart"
                  title="Remove from favorites"
                >
                  <Heart className="w-5 h-5 text-red-500 fill-red-500 group-hover/heart:scale-110 transition-transform" />
                </button>

                {/* Optional: Sale badge */}
                {product.rating?.rate >= 4.5 && (
                  <div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-600 font-medium">
                      {product.rating?.rate}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 flex-1">
                  {product.title}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => moveToCart(product)}
                    className="flex-1 bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromFavorites(product.id)}
                    className="bg-red-50 text-red-600 px-4 py-2.5 rounded-lg hover:bg-red-100 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-3 rounded-lg hover:border-gray-300 transition-colors font-medium"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => {
              favorites.forEach((product) => moveToCart(product));
              navigate("/cart");
            }}
            className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Move All to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Add some products to get started!
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition w-full sm:w-auto"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 text-sm font-medium text-left sm:text-center"
          >
            Clear Cart
          </button>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border-b border-gray-200 last:border-b-0"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full sm:w-20 h-40 sm:h-20 object-contain bg-gray-100 rounded"
              />

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Mobile Layout: Quantity + Price + Delete */}
              <div className="flex items-center justify-between sm:contents">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 sm:w-12 text-center font-medium text-sm sm:text-base">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Total Price */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <p className="font-bold text-gray-900 text-sm sm:text-base">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 p-2 transition"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg sm:text-xl font-semibold text-gray-900">
              Total:
            </span>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              ${getCartTotal().toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition font-medium text-sm sm:text-base"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full mt-3 bg-gray-200 text-gray-900 py-3 rounded-md hover:bg-gray-300 transition font-medium text-sm sm:text-base"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

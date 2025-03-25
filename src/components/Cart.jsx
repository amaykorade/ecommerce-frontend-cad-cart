import React, { useState, useEffect } from "react";
import { Trash2, ShoppingCart, MinusCircle, PlusCircle } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <ShoppingCart className="mr-2 h-7 w-7" />
              Your Cart
            </h1>
            <span className="text-gray-600">{cartItems.length} items</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white border-b py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center space-x-4 w-1/3">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-amber-600 font-medium">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-gray-600 hover:text-red-500"
                  >
                    <MinusCircle className="h-6 w-6" />
                  </button>
                  <span className="font-medium text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-600 hover:text-green-500"
                  >
                    <PlusCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="font-bold text-gray-900 w-1/6">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 className="h-6 w-6" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="bg-white border rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-gray-700">
                  {item.title} x {item.quantity}
                </span>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-amber-600">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <button className="w-full bg-amber-600 text-white py-3 rounded-lg mt-6 hover:bg-amber-700 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

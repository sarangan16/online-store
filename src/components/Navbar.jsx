import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

const Navbar = ({ cartItems, itemCount, removeFromCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PYN8aAf9XbbjxqDzq7dZzdkJjMrjVIgSwGxApNC4V7To2C2EfVKch6Sj6kYbXzu9eOCsmPNt95ojrem0MYeEkyA00JAqD14BM"
    );

    const body = { items: cartItems };
    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <div className="text-2xl font-bold tracking-tight">
          <Link to="/" className="flex items-center space-x-1">
            <span className="text-black">Ka</span>
            <span className="text-red-600">uf.</span>
            <span className="text-yellow-500">DE</span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-8 text-gray-800 font-medium">
          <Link to="/" className="relative group">
            Store
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-red-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/contact" className="relative group">
            Kontakt
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-red-600 transition-all group-hover:w-full"></span>
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative"
            >
              <FaShoppingCart className="text-xl hover:text-red-600 transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {isCartOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">Cart Items</h3>
                </div>
                <ul className="max-h-60 overflow-y-auto divide-y divide-gray-100">
                  {cartItems.length === 0 && (
                    <li className="p-4 text-gray-500 text-sm">
                      Your cart is empty
                    </li>
                  )}
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="p-3 flex items-center justify-between space-x-3 hover:bg-gray-50 transition"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-10 h-10 object-contain flex-shrink-0"
                      />
                      <span className="text-sm truncate flex-1">
                        {item.title}
                      </span>
                      <span className="text-sm font-semibold whitespace-nowrap">
                        ${item.price}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <MdDeleteForever className="text-lg" />
                      </button>
                    </li>
                  ))}
                </ul>
                {cartItems.length > 0 && (
                  <div className="p-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-gray-900">
                        $
                        {cartItems
                          .reduce((total, item) => total + item.price, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={makePayment}
                      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          className="lg:hidden flex flex-col justify-center items-center space-y-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block h-0.5 w-6 bg-gray-800 transform transition ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-800 transition ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-800 transform transition ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden px-6 pb-4 space-y-2 bg-white shadow-inner">
          <Link
            to="/"
            className="block text-gray-800 py-2 hover:text-red-600 transition"
          >
            Store
          </Link>
          <Link
            to="/contact"
            className="block text-gray-800 py-2 hover:text-red-600 transition"
          >
            Kontakt
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

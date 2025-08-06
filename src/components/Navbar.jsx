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

    const body = {
      items: cartItems,
    };

    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full shadow bg-white text-black z-50">
      <header className="h-24 sm:h-16 flex items-center z-30 w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="text-[#1d3557] text-3xl">
            <Link to="/">
              <span className="text-[#000000]">Ka</span>
              <span className="text-[#DD0000]">uf.</span>
              <span className="text-[#FFCE00]">DE</span>
            </Link>
          </div>

          <nav className="text-gray-800 uppercase text-lg lg:flex items-center hidden space-x-6">
            <Link to="/">Store</Link>
            <Link to="/contact">Kontakt</Link>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative"
            >
              <FaShoppingCart className="text-xl" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            {isCartOpen && (
              <div className="absolute right-6 top-16 bg-white shadow-lg rounded-lg w-80 p-4 z-50">
                <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
                <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="py-2 flex items-center justify-between space-x-3"
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
                <div className="mt-4 text-right font-bold text-lg">
                  Total: $
                  {cartItems
                    .reduce((total, item) => total + item.price, 0)
                    .toFixed(2)}
                </div>
                {cartItems.length > 0 && (
                  <div className="mt-4 text-right">
                    <button
                      onClick={makePayment}
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      Pay
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          <button
            className="lg:hidden flex flex-col ml-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="w-6 h-1 bg-gray-800 mb-1"></span>
            <span className="w-6 h-1 bg-gray-800 mb-1"></span>
            <span className="w-6 h-1 bg-gray-800 mb-1"></span>
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="lg:hidden px-6 pb-4 space-y-2">
          <Link to="/" className="block text-gray-800">
            Home
          </Link>
          <Link to="/contact" className="block text-gray-800">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

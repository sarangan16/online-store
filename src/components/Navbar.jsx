import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow bg-white text-black">
      <header className="h-24 sm:h-32 flex items-center z-30 w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="uppercase text-gray-800 text-[#FF5733] font-black text-3xl">
            KAUFDE
          </div>

          <nav className="font-sen text-gray-800 uppercase text-lg lg:flex items-center hidden space-x-6">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
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
          <Link to="/" className="block text-gray-800 hover:underline">
            Home
          </Link>
          <Link to="/contact" className="block text-gray-800 hover:underline">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow bg-white text-black">
      <header className="h-24 sm:h-16 flex items-center z-30 w-full">
        <div className="container mx-auto px-6 flex items-center justify-between h-screen">
          <div className="text-[#1d3557] text-3xl">
            <Link to="/">
              <span className="text-[#000000]">Ka</span>
              <span className="text-[#DD0000]">uf.</span>
              <span className="text-[#FFCE00]">DE</span>
            </Link>
          </div>

          <nav className="text-gray-800 uppercase text-lg lg:flex items-center hidden space-x-6">
            <Link to="/">Store</Link>
            <Link to="/contact">Contact</Link>
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

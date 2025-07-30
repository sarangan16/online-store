import React, { useState } from "react";

const Navbar = () => {
  return (
    <>
      <nav class=" shadow dark:bg-white-800 text-black">
        <header class="h-24 sm:h-32 flex items-center z-30 w-full">
          <div class="container mx-auto px-6 flex items-center justify-between">
            <div class="uppercase text-gray-800 dark text-[#FF5733] font-black text-3xl">
              KAUFDE
            </div>
            <div class="flex items-center">
              <nav class="font-sen text-gray-800 dark:text-black uppercase text-lg lg:flex items-center hidden">
                <a
                  href="#"
                  class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Shop
                </a>
                <a
                  href="#"
                  class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700x"
                >
                  Contact
                </a>
              </nav>
              <button class="lg:hidden flex flex-col ml-4">
                <span class="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
                <span class="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
                <span class="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
              </button>
            </div>
          </div>
        </header>
      </nav>
    </>
  );
};

export default Navbar;

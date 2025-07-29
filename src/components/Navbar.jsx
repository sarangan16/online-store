import React, { useState } from "react";

const Navbar = () => {
  return (
    <>
      <nav class="bg-gray-200 shadow dark:bg-white-800">
        <div class="container flex items-center justify-center p-6 mx-auto text-black-800 capitalize dark:text-black-800">
          <a
            href="#"
            class="text-gray-800 dark:text-black-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
          >
            <img src="./images/shopping1.png" alt="Logo" className="w-20" />
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

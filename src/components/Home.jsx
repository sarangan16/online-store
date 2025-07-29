import React, { useState, useEffect } from "react";
import { FaOpencart } from "react-icons/fa";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        alert("Failed to load");
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="w-full flex items-center justify-center ">
        <div className="search-input w-full sm:w-1/2 px-4">
          <input
            type="text"
            className="w-full px-6 py-3 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-white"
            placeholder="search products"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {products
          .filter((product) => {
            return search.toLowerCase() === ""
              ? product
              : product.title.toLowerCase().includes(search);
          })
          .map((product) => (
            <div
              key={product.id}
              className="border rounded p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-40 w-full object-contain mb-4"
              />
              <h2 className="text-sm font-semibold mb-2">{product.title}</h2>
              <p className="text-lg font-bold mb-2">${product.price}</p>
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <FaOpencart />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;

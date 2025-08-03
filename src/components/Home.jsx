import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

// changing starts now
const Home = (props) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  function loadProducts(url) {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }

  function LoadCategories() {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        data.unshift("all");
        setCategories(data);
      });
  }

  useEffect(() => {
    loadProducts("https://fakestoreapi.com/products/");
    LoadCategories();
  }, [props.cartItems.length]); // fixed here

  function handleCategoryChange(e) {
    const value = e.target.value.toLowerCase();
    if (value === "all") {
      loadProducts("https://fakestoreapi.com/products/");
    } else {
      loadProducts(`https://fakestoreapi.com/products/category/${value}`);
    }
  }

  function addToCart(e) {
    alert("Item Added to cart");
    props.addToCart(e.target.id);
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex">
        <div className="w-full flex justify-center">
          <div className="search-input w-full px-4">
            <input
              type="text"
              className="w-full px-6 py-3 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-white"
              placeholder="search products"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="select-category w-48">
          <nav>
            <select
              onChange={handleCategoryChange}
              className="shadow-md border border-gray-300 py-3"
            >
              {categories.map((category) => (
                <option key={category}>{category.toUpperCase()}</option>
              ))}
            </select>
          </nav>
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
              className="flex flex-col justify-between h-full border rounded p-4 shadow hover:shadow-lg transition"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-full object-contain mb-4"
                />
                <h2 className="text-sm font-semibold mb-2">{product.title}</h2>
                <p className="text-lg font-bold mb-2">${product.price}</p>
              </Link>
              <div className="flex flex-col items-center space-x-2 mt-2">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) =>
                    i < Math.round(product.rating.rate) ? (
                      <FaStar key={i} className="w-4 h-4" />
                    ) : (
                      <FaRegStar key={i} className="w-4 h-4" />
                    )
                  )}
                </div>

                <span className="text-sm text-gray-600">
                  {product.rating.rate} ({product.rating.count})
                </span>
              </div>
              <button
                id={product.id}
                onClick={addToCart}
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-3"
              >
                Add To Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;

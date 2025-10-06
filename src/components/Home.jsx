import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Toast from "./Toast";

gsap.registerPlugin(ScrollTrigger);

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const cardsRef = useRef([]);

  const loadProducts = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data = await res.json();
      data.unshift("all");
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  useEffect(() => {
    loadProducts("https://fakestoreapi.com/products");
    loadCategories();
  }, []);

  useEffect(() => {
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 90%",
          },
        }
      );
    }
  }, [products]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "all") {
      loadProducts("https://fakestoreapi.com/products/");
    } else {
      loadProducts(
        `https://fakestoreapi.com/products/category/${encodeURIComponent(
          value
        )}`
      );
    }
  };

  const handleAddToCart = (e) => {
    addToCart(e.target.id);
    setToastMessage("Item added to cart!");
  };

  return (
    <div id="home" className="scroll-mt-24 container mx-auto px-4 py-12">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}

      <div className="flex flex-col md:flex-row items-center gap-4 mb-12">
        <input
          type="text"
          placeholder="🔍 Search products..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:flex-1 px-6 py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <select
          onChange={handleCategoryChange}
          className="w-full md:w-48 px-4 py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="text-center text-lg font-semibold text-gray-600 mt-8">
          Loading products...
        </div>
      )}

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8 space-y-8">
        {products
          .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
          .map((product, i) => (
            <div
              key={product.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="break-inside-avoid bg-white rounded-3xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6"
            >
              <Link to={`/product/${product.id}`} className="block mb-4">
                <div className="w-full h-72 flex items-center justify-center rounded-2xl bg-gray-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain max-h-full transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://dummyimage.com/150x150/cccccc/000000&text=No+Image";
                    }}
                  />
                </div>
              </Link>

              <Link
                to={`/product/${product.id}`}
                className="block text-center mb-2"
              >
                <h2 className="text-base font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
                  {product.title}
                </h2>
              </Link>

              <p className="text-lg font-bold text-gray-900 mb-3 text-center">
                ${product.price}
              </p>

              <div className="flex justify-center items-center gap-2 mb-5">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) =>
                    i < Math.round(product.rating.rate) ? (
                      <FaStar key={i} className="w-4 h-4" />
                    ) : (
                      <FaRegStar key={i} className="w-4 h-4" />
                    )
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.rating.count})
                </span>
              </div>

              <button
                id={product.id}
                onClick={handleAddToCart}
                className="w-full bg-indigo-600 text-white font-semibold px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default React.memo(Home);

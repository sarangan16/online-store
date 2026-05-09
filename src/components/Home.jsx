import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
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

  const MAKEUP_CATEGORIES = [
    { label: "All", value: "" },
    { label: "Lipstick", value: "lipstick" },
    { label: "Foundation", value: "foundation" },
    { label: "Eyeshadow", value: "eyeshadow" },
    { label: "Blush", value: "blush" },
    { label: "Mascara", value: "mascara" },
    { label: "Bronzer", value: "bronzer" },
    { label: "Nail Polish", value: "nail_polish" },
  ];

  const loadProducts = async (category) => {
    setLoading(true);
    try {
      let url = "https://makeup-api.herokuapp.com/api/v1/products.json";
      if (category) url += `?product_type=${category}`;
      const res = await fetch(url);
      const data = await res.json();
      // only show products that have images
      const clean = data.filter((p) => p.image_link).slice(0, 40);
      setProducts(clean);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts("");
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
        },
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
          value,
        )}`,
      );
    }
  };

  const handleAddToCart = (e) => {
    addToCart(e.target.id);
    setToastMessage("Item added to cart!");
  };

  return (
    <div id="home" className="scroll-mt-24 container mx-auto px-4 py-16">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}

      {/* search + filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
        <input
          type="text"
          placeholder="Search for products..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:flex-1 px-6 py-3 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <select
          onChange={handleCategoryChange}
          className="w-full md:w-48 px-4 py-3 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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

      {/* product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products
          .filter(
            (p) =>
              p.name && p.name.toLowerCase().includes(search.toLowerCase()),
          )

          .map((product, i) => (
            <div
              key={product.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="flex flex-col justify-between bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500 hover:-translate-y-1 p-6"
            >
              <div>
                <Link to={`/product/${product.id}`} className="block mb-5">
                  <div className="w-full h-72 flex items-center justify-center rounded-2xl bg-gray-50 overflow-hidden">
                    <img
                      src={product.image_link}
                      alt={product.name}
                      className="object-contain max-h-full transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80";
                      }}
                    />
                  </div>
                </Link>

                <Link
                  to={`/product/${product.id}`}
                  className="block text-center mb-3"
                >
                  <h2 className="text-base font-medium text-gray-800 hover:text-indigo-600 transition-colors leading-snug">
                    {product.name}
                  </h2>
                </Link>

                <p className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  ${parseFloat(product.price || 12.99).toFixed(2)}
                </p>

                <div className="flex justify-center items-center gap-2 mb-5">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }, (_, i) =>
                      i < Math.round(parseFloat(product.rating) || 0) ? (
                        <FaStar key={i} className="w-4 h-4" />
                      ) : (
                        <FaRegStar key={i} className="w-4 h-4" />
                      ),
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.rating || "N/A"})
                  </span>
                </div>
              </div>

              {/* consistent button height */}
              <div className="mt-auto pt-4">
                <button
                  id={product.id}
                  onClick={handleAddToCart}
                  className="w-full h-11 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default React.memo(Home);

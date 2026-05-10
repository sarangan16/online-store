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

  const handleCategoryChange = (category) => {
    loadProducts(category);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setToastMessage(`${product.name.slice(0, 20)}... added to bag!`);
  };

  return (
    <div
      id="home"
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "80px 20px",
        backgroundColor: "#07060d",
      }}
    >
      {/* section heading */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p
          style={{
            color: "#c9a84c",
            fontSize: "11px",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            fontFamily: "Jost, sans-serif",
            marginBottom: "16px",
          }}
        >
          — The Collection —
        </p>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "52px",
            color: "#ede8f5",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Discover{" "}
          <span
            style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #9a7a30, #c9a84c, #f5e6a3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Beauty
          </span>
        </h2>
        <div
          className="gold-divider"
          style={{ width: "120px", margin: "0 auto" }}
        />
      </div>

      {/* search + filter */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        {" "}
        <input
          type="text"
          placeholder="Search for products..."
          onChange={(e) => setSearch(e.target.value)}
          className="input-luxury"
          style={{ maxWidth: "300px" }}
        />
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {MAKEUP_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              style={{
                padding: "8px 20px",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "Jost, sans-serif",
                border: "1px solid #2e2050",
                background: "transparent",
                color: "#7a6a96",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-center text-lg font-semibold text-gray-600 mt-8">
          Loading products...
        </div>
      )}

      {/* product grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {" "}
        {products
          .filter(
            (p) =>
              p.name && p.name.toLowerCase().includes(search.toLowerCase()),
          )

          .map((product, i) => (
            <div
              key={product.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="flex flex-col justify-between card-hover"
              style={{ background: "#0f0d1a", border: "1px solid #2e2050" }}
            >
              <div style={{ padding: "16px 16px 8px" }}>
                <Link to={`/product/${product.id}`} className="block mb-5">
                  <div
                    style={{
                      width: "100%",
                      height: "220px",
                      overflow: "hidden",
                      background: "#1a1428",
                    }}
                  >
                    <img
                      src={
                        product.image_link
                          ? product.image_link.replace("http://", "https://")
                          : "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80"
                      }
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                    />
                  </div>
                </Link>

                <p
                  style={{
                    color: "#c9a84c",
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    fontFamily: "Jost, sans-serif",
                    marginBottom: "6px",
                  }}
                >
                  {product.brand || "SARANS"}
                </p>
                <Link
                  to={`/product/${product.id}`}
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    textDecoration: "none",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "Jost, sans-serif",
                      fontSize: "13px",
                      color: "#ede8f5",
                      lineHeight: 1.4,
                    }}
                  >
                    {product.name}
                  </h2>
                </Link>

                <p
                  className="font-body text-sm mb-4"
                  style={{ color: "#c9a84c" }}
                >
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
              <div style={{ padding: "0 16px 16px" }}>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn-gold w-full"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default React.memo(Home);

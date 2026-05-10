import React, { useState, useEffect, useRef } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// images for broken api product images
const CATEGORY_IMAGES = {
  lipstick: [
    "https://images.unsplash.com/photo-1631214524020-3c69888f8329?w=400&q=80",
    "https://images.unsplash.com/photo-1599733589046-833b4a2f5a50?w=400&q=80",
    "https://images.unsplash.com/photo-1586495777744-4e6232bf8eb7?w=400&q=80",
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80",
  ],
  foundation: [
    "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&q=80",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
  ],
  eyeshadow: [
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
    "https://images.unsplash.com/photo-1583241475880-083f84372725?w=400&q=80",
    "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80",
  ],
  blush: [
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80",
    "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&q=80",
  ],
  mascara: [
    "https://images.unsplash.com/photo-1631214499177-b1f67267a71e?w=400&q=80",
    "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&q=80",
  ],
  bronzer: [
    "https://images.unsplash.com/photo-1599733594230-6b823276d4b6?w=400&q=80",
    "https://images.unsplash.com/photo-1560461396-ec0ef7bb5b0f?w=400&q=80",
  ],
  nail_polish: [
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80",
    "https://images.unsplash.com/photo-1604654894611-6973b7783598?w=400&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
    "https://images.unsplash.com/photo-1560461396-ec0ef7bb5b0f?w=400&q=80",
  ],
};

// pick a consistent image for each product based on its id
function getProductImage(product) {
  const category = product.product_type || "default";
  const images = CATEGORY_IMAGES[category] || CATEGORY_IMAGES.default;
  return images[product.id % images.length];
}

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const cardsRef = useRef([]);

  const MAKEUP_CATEGORIES = [
    { label: "All", value: "" },
    { label: "Beauty", value: "beauty" },
    { label: "Skin Care", value: "skin-care" },
    { label: "Fragrances", value: "fragrances" },
    { label: "Jewellery", value: "womens-jewellery" },
    { label: "Sunglasses", value: "sunglasses" },
    { label: "Bags", value: "womens-bags" },
  ];

  const loadProducts = async (category) => {
    setLoading(true);
    try {
      // dummyjson is way faster and more reliable than makeup api
      let url = "https://dummyjson.com/products?limit=40";
      if (category && category !== "") {
        url = `https://dummyjson.com/products/category/${category}?limit=40`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products);
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

      {/* search + filter products */}
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

      {/* product grid listing */}
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
              p.title && p.title.toLowerCase().includes(search.toLowerCase()),
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
                      src={product.thumbnail}
                      alt={product.title}
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
                  {product.brand || product.category}
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
                    {product.title}{" "}
                  </h2>
                </Link>

                <p
                  className="font-body text-sm mb-4"
                  style={{ color: "#c9a84c" }}
                >
                  ${parseFloat(product.price || 12.99).toFixed(2)}
                </p>
              </div>

              {/* add to bag btn */}
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

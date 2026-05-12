import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

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
        backgroundColor: "#ffffff",
      }}
    >
      {/* section heading */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p
          style={{
            color: "#999",
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
            color: "#111",
          }}
        >
          Discover{" "}
          <span
            style={{
              fontStyle: "italic",
              color: "#111",
            }}
          >
            Beauty
          </span>
        </h2>
        <div
          className="gold-divider"
          style={{
            width: "40px",
            height: "1px",
            background: "#111",
            margin: "0 auto",
          }}
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
                border: "1px solid #ddd",
                background: "transparent",
                color: "#777",
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
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
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
              className="card-hover"
              style={{
                background: "#ffffff",
                border: "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* full image with overlay text - editorial style */}
              <Link
                to={`/product/${product.id}`}
                style={{ display: "block", textDecoration: "none" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "280px",

                    overflow: "hidden",
                    position: "relative",
                    background: "#f5f5f5",
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      padding: "20px",
                      transition: "transform 0.7s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "scale(1.06)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = "scale(1)")
                    }
                  />
                </div>
              </Link>
              <div style={{ padding: "14px 4px 20px" }}>
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#999",
                    fontFamily: "Jost, sans-serif",
                    marginBottom: "5px",
                  }}
                >
                  {product.brand || product.category}
                </p>
                <Link
                  to={`/product/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "15px",
                      color: "#111",
                      lineHeight: 1.4,
                      marginBottom: "10px",
                    }}
                  >
                    {product.title}
                  </p>
                </Link>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#111" }}>
                    ${parseFloat(product.price || 12.99).toFixed(2)}
                  </span>
                  {product.rating && (
                    <span style={{ fontSize: "11px", color: "#999" }}>
                      ★ {product.rating}
                    </span>
                  )}
                </div>
              </div>

              {/* add to bag button */}
              <div style={{ padding: "12px 16px" }}>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn-gold"
                  style={{ width: "100%", padding: "10px", fontSize: "10px" }}
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

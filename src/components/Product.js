import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";

const Product = ({ addToCart }) => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => {
        console.error("Failed to load product");
      });
  }, [id]);

  if (!product)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "2px solid #111",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
    );

  const price = product.price
    ? `$${parseFloat(product.price).toFixed(2)}`
    : "$14.99";
  const description = product.description
    ? product.description.replace(/<[^>]*>/g, "")
    : "A luxurious addition to your beauty collection.";
  const imgSrc =
    product.thumbnail ||
    product.images?.[0] ||
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80";

  const reviews = [
    {
      rating: 5,
      text: "Absolutely stunning product. The quality is beyond what I expected.",
      user: "Alicia M.",
    },
    {
      rating: 4,
      text: "Gorgeous shade and very long lasting. Completely worth it.",
      user: "Sophie R.",
    },
    {
      rating: 5,
      text: "I bought three of these. The pigment is incredible.",
      user: "Zara K.",
    },
  ];

  return (
    <div
      style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "40px" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>
        {/* back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            color: "#7a6a96",
            cursor: "pointer",
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "Jost, sans-serif",
            marginBottom: "48px",
          }}
        >
          <FiArrowLeft size={14} /> Back
        </button>

        {/* product section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            marginBottom: "40px",
          }}
        >
          {/* image */}
          <div
            style={{
              background: "#f5f5f5",
              border: "none",
              overflow: "hidden",
              aspectRatio: "1",
              position: "relative",
            }}
          >
            <img
              src={imgSrc}
              alt={product.title}
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80";
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: "24px",
              }}
            />
          </div>

          {/* info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <div>
              <p
                style={{
                  color: "#999",
                  fontSize: "11px",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  fontFamily: "Jost, sans-serif",
                  marginBottom: "8px",
                }}
              >
                {product.brand || "SARANS"} — {product.category || "Beauty"}
              </p>
              <h1
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "28px",
                  color: "#111",
                  lineHeight: 1.1,
                }}
              >
                {product.title}
              </h1>
            </div>

            {/* rating */}
            {product.rating && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                {Array.from({ length: 5 }, (_, i) =>
                  i < Math.round(parseFloat(product.rating)) ? (
                    <FaStar
                      key={i}
                      style={{
                        color: "#111",
                        width: "14px",
                        height: "14px",
                      }}
                    />
                  ) : (
                    <FaRegStar
                      key={i}
                      style={{
                        color: "#999",
                        width: "14px",
                        height: "14px",
                      }}
                    />
                  ),
                )}
                <span
                  style={{
                    color: "#7a6a96",
                    fontSize: "12px",
                    fontFamily: "Jost, sans-serif",
                    marginLeft: "4px",
                  }}
                >
                  {product.rating}
                </span>
              </div>
            )}

            <div style={{ height: "1px", background: "#eee" }} />

            {/* price */}
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "26",
                color: "#111",
              }}
            >
              {price}
            </p>

            {/* description */}
            <p
              style={{
                color: "#555",
                fontFamily: "Jost, sans-serif",
                fontSize: "14px",
                lineHeight: 1.8,
              }}
            >
              {description.slice(0, 300)}
            </p>

            {/* add to cart */}
            <button
              onClick={() => addToCart(product)}
              className="btn-gold"
              style={{ marginTop: "8px" }}
            >
              <FiShoppingBag size={15} /> Add to Bag
            </button>

            <p
              style={{
                color: "#aaa",
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontFamily: "Jost, sans-serif",
                textAlign: "center",
              }}
            >
              Free shipping on orders over $60
            </p>
          </div>
        </div>

        {/* reviews */}
        <div>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "28px",
                color: "#111",
              }}
            >
              What They Say
            </h2>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "#111",
                margin: "16px auto 0",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {reviews.map((review, idx) => (
              <div
                key={idx}
                style={{
                  background: "#f9f9f9",
                  border: "1px solid #eee",
                  padding: "28px",
                }}
                className="card-hover"
              >
                <div
                  style={{ display: "flex", gap: "4px", marginBottom: "16px" }}
                >
                  {Array.from({ length: 5 }, (_, i) =>
                    i < review.rating ? (
                      <FaStar
                        key={i}
                        style={{ color: "#111", width: "12px" }}
                      />
                    ) : (
                      <FaRegStar
                        key={i}
                        style={{ color: "#ddd", width: "12px" }}
                      />
                    ),
                  )}
                </div>
                <p
                  style={{
                    color: "#555",
                    fontFamily: "Jost, sans-serif",
                    fontSize: "13px",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                    marginBottom: "20px",
                  }}
                >
                  "{review.text}"
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "#f0f0f0",
                      border: "1px solid #ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#111",
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "16px",
                    }}
                  >
                    {review.user[0]}
                  </div>
                  <span
                    style={{
                      color: "#111",
                      fontFamily: "Jost, sans-serif",
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {review.user}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

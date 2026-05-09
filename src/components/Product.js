import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiArrowLeft, FiShoppingBag, FiCheck } from "react-icons/fi";

const Product = ({ addToCart }) => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json`)
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
            border: "2px solid #c9a84c",
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
  const imgSrc = product.image_link
    ? product.image_link.replace("http://", "https://")
    : "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80";

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
      style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "80px" }}
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
            gap: "60px",
            marginBottom: "80px",
          }}
        >
          {/* image */}
          <div
            style={{
              background: "#0f0d1a",
              border: "1px solid #2e2050",
              overflow: "hidden",
              aspectRatio: "1",
              position: "relative",
            }}
          >
            <img
              src={imgSrc}
              alt={product.name}
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80";
              }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* corner decorations */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "40px",
                height: "40px",
                borderTop: "2px solid rgba(201,168,76,0.3)",
                borderLeft: "2px solid rgba(201,168,76,0.3)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "40px",
                height: "40px",
                borderBottom: "2px solid rgba(201,168,76,0.3)",
                borderRight: "2px solid rgba(201,168,76,0.3)",
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
                  color: "#c9a84c",
                  fontSize: "11px",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  fontFamily: "Jost, sans-serif",
                  marginBottom: "8px",
                }}
              >
                {product.brand || "SARANS"} — {product.product_type || "Beauty"}
              </p>
              <h1
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "42px",
                  color: "#ede8f5",
                  lineHeight: 1.1,
                }}
              >
                {product.name}
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
                        color: "#c9a84c",
                        width: "14px",
                        height: "14px",
                      }}
                    />
                  ) : (
                    <FaRegStar
                      key={i}
                      style={{
                        color: "#2e2050",
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

            <div className="gold-divider" />

            {/* price */}
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "36px",
                background:
                  "linear-gradient(135deg, #9a7a30, #c9a84c, #f5e6a3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {price}
            </p>

            {/* description */}
            <p
              style={{
                color: "#7a6a96",
                fontFamily: "Jost, sans-serif",
                fontSize: "14px",
                lineHeight: 1.8,
              }}
            >
              {description.slice(0, 300)}
            </p>

            {/* color swatches */}
            {product.product_colors && product.product_colors.length > 0 && (
              <div>
                <p
                  style={{
                    color: "#7a6a96",
                    fontSize: "10px",
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    fontFamily: "Jost, sans-serif",
                    marginBottom: "10px",
                  }}
                >
                  Available Shades
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {product.product_colors.slice(0, 12).map((color, i) => (
                    <div
                      key={i}
                      title={color.colour_name}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: color.hex_value,
                        border: "1px solid #2e2050",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

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
                color: "#7a6a96",
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
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "42px",
                color: "#ede8f5",
              }}
            >
              What They Say
            </h2>
            <div
              className="gold-divider"
              style={{ width: "100px", margin: "16px auto 0" }}
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
                  background: "#0f0d1a",
                  border: "1px solid #2e2050",
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
                        style={{ color: "#c9a84c", width: "12px" }}
                      />
                    ) : (
                      <FaRegStar
                        key={i}
                        style={{ color: "#2e2050", width: "12px" }}
                      />
                    ),
                  )}
                </div>
                <p
                  style={{
                    color: "#7a6a96",
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
                      background: "#1a1428",
                      border: "1px solid rgba(201,168,76,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#c9a84c",
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "16px",
                    }}
                  >
                    {review.user[0]}
                  </div>
                  <span
                    style={{
                      color: "#ede8f5",
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

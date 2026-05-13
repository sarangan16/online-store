import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

const Navbar = ({
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const makePayment = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PK);

    const body = { items: cartItems };
    const response = await fetch(
      "https://online-store-production-20e1.up.railway.app/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) alert(result.error.message);
  };

  const cartTotal = cartItems
    .reduce(
      (sum, item) =>
        sum + (parseFloat(item.price) || 12.99) * (item.quantity || 1),
      0,
    )
    .toFixed(2);

  return (
    <>
      {/* main navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.5s ease",
          background: "#ffffff",
          borderBottom: "1px solid #e8e8e8",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 40px",
          }}
        >
          {/* logo */}
          <Link
            to="/"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "20px",
              letterSpacing: "0.3em",
              color: "#111",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            SARANS
          </Link>

          {/* nav links */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <Link
              to="/"
              className="font-body text-xs tracking-widest uppercase text-sarans-muted hover:text-sarans-text transition-colors duration-300 relative group"
              style={{ color: "#555", textDecoration: "none" }}
            >
              Store
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              to="/contact"
              className="font-body text-xs tracking-widest uppercase transition-colors duration-300 relative group"
              style={{ color: "#555", textDecoration: "none" }}
            >
              Contact
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* cart button */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                style={{
                  position: "relative",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <FaShoppingCart style={{ fontSize: "18px", color: "#111" }} />
                {cartItems.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      background: "#111111",
                      color: "#ffffff",
                      fontSize: "10px",
                      fontWeight: "bold",
                      borderRadius: "10px",
                      minWidth: "18px",
                      height: "18px",
                      padding: "0 4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cartItems.reduce(
                      (sum, item) => sum + (item.quantity || 1),
                      0,
                    )}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* cart drawer overlay */}
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 60,
          }}
        />
      )}

      {/* cart drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: "360px",
          backgroundColor: "#ffffff",
          borderLeft: "1px solid #e8e8e8",
          zIndex: 70,
          display: "flex",
          flexDirection: "column",
          transform: isCartOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s ease",
        }}
      >
        {/* drawer header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 28px",
            borderBottom: "1px solid #e8e8e8",
          }}
        >
          <div>
            <h2 className="font-display text-2xl text-sarans-text">Your Bag</h2>
            <p className="font-body text-xs tracking-widest text-sarans-muted mt-1">
              {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}{" "}
              items{" "}
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "#7a6a96",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            ✕
          </button>
        </div>

        {/* cart items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 28px" }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: "60px" }}>
              <FaShoppingCart
                style={{
                  fontSize: "48px",
                  color: "#2e2050",
                  margin: "0 auto 16px",
                }}
              />
              <p className="text-sarans-muted font-body text-sm">
                Your bag is empty
              </p>
            </div>
          ) : (
            cartItems.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "16px",
                  marginBottom: "12px",
                  background: "#f9f9f9",
                  border: "1px solid #eee",
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    background: "#f0f0f0",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&q=80";
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: "12px",
                      color: "#111",
                      fontFamily: "Jost, sans-serif",
                    }}
                  >
                    {item.title}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "6px",
                    }}
                  >
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "1px solid #ddd",
                        background: "none",
                        cursor: "pointer",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        fontSize: "12px",
                        fontFamily: "Jost, sans-serif",
                        color: "#111",
                      }}
                    >
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "1px solid #ddd",
                        background: "none",
                        cursor: "pointer",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      +
                    </button>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#111",
                        marginLeft: "4px",
                      }}
                    >
                      $
                      {(
                        parseFloat(item.price || 12.99) * (item.quantity || 1)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#aaa",
                    cursor: "pointer",
                  }}
                >
                  <MdDeleteForever size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* drawer footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: "24px 28px", borderTop: "1px solid #e8e8e8" }}>
            <div
              style={{
                height: "1px",
                background: "#eee",
                marginBottom: "16px",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <span className="font-body text-xs tracking-widest uppercase text-sarans-muted">
                Total
              </span>
              <span
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "24px",
                  color: "#111",
                }}
              >
                ${cartTotal}
              </span>
            </div>
            <button
              onClick={makePayment}
              className="btn-gold"
              style={{ width: "100%" }}
            >
              Checkout with Stripe
            </button>
            <p
              className="font-body text-sarans-muted"
              style={{
                fontSize: "10px",
                textAlign: "center",
                marginTop: "12px",
              }}
            >
              🔒 Secured by Stripe
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

const Navbar = ({ cartItems, itemCount, removeFromCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PYN8aAf9XbbjxqDzq7dZzdkJjMrjVIgSwGxApNC4V7To2C2EfVKch6Sj6kYbXzu9eOCsmPNt95ojrem0MYeEkyA00JAqD14BM",
    );
    const body = { items: cartItems };
    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) alert(result.error.message);
  };

  const cartTotal = cartItems
    .reduce((sum, item) => sum + (parseFloat(item.price) || 12.99), 0)
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
          background: scrolled
            ? "rgba(7,6,13,0.95)"
            : "linear-gradient(to bottom, rgba(7,6,13,0.8) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #2e2050" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: "80px",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 40px",
          }}
        >
          {/* logo */}
          <Link
            to="/"
            className="gold-shimmer font-display text-2xl tracking-widest uppercase"
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
              style={{ color: "#7a6a96", textDecoration: "none" }}
            >
              Store
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              to="/contact"
              className="font-body text-xs tracking-widest uppercase transition-colors duration-300 relative group"
              style={{ color: "#7a6a96", textDecoration: "none" }}
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
                <FaShoppingCart
                  style={{ fontSize: "20px", color: "#7a6a96" }}
                />
                {cartItems.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      background: "#c9a84c",
                      color: "#07060d",
                      fontSize: "10px",
                      fontWeight: "bold",
                      borderRadius: "50%",
                      width: "16px",
                      height: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cartItems.length}{" "}
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
          backgroundColor: "#0f0d1a",
          borderLeft: "1px solid #2e2050",
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
            borderBottom: "1px solid #2e2050",
          }}
        >
          <div>
            <h2 className="font-display text-2xl text-sarans-text">Your Bag</h2>
            <p className="font-body text-xs tracking-widest text-sarans-muted mt-1">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
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
                  background: "#1a1428",
                  border: "1px solid #2e2050",
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    background: "#07060d",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&q=80";
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    className="font-body text-xs text-sarans-text"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="font-body text-sm"
                    style={{ color: "#c9a84c", marginTop: "4px" }}
                  >
                    ${parseFloat(item.price || 12.99).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#7a6a96",
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
          <div style={{ padding: "24px 28px", borderTop: "1px solid #2e2050" }}>
            <div className="gold-divider" style={{ marginBottom: "16px" }} />
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
              <span className="font-display text-2xl gold-text">
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

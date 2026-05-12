import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#f9f9f9",
        borderTop: "1px solid #e8e8e8",
        marginTop: "0px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "60px 40px 40px",
        }}
      >
        {/* top section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* brand */}
          <div>
            <h3
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "28px",
                color: "#111",
                letterSpacing: "0.2em",
                marginBottom: "16px",
              }}
            >
              SARANS
            </h3>
            <p
              style={{
                color: "#888",
                fontFamily: "Jost, sans-serif",
                fontSize: "13px",
              }}
            >
              Luxury cosmetics curated for those who believe beauty is an art
              form. Every product tells a story.
            </p>
          </div>

          {/* quick links */}
          <div>
            <p
              style={{
                color: "#111",
                fontSize: "10px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                fontFamily: "Jost, sans-serif",
                marginBottom: "20px",
              }}
            >
              Navigate
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                ["/", "Store"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  style={{
                    color: "#888",
                    fontFamily: "Jost, sans-serif",
                    fontSize: "13px",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#111")}
                  onMouseLeave={(e) => (e.target.style.color = "#888")}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* newsletter */}
          <div>
            <p
              style={{
                color: "#ede8f5",
                fontSize: "10px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                fontFamily: "Jost, sans-serif",
                marginBottom: "20px",
              }}
            >
              Stay in the Glow
            </p>
            <div style={{ display: "flex", gap: "0" }}>
              <input
                type="email"
                placeholder="your@email.com"
                className="input-luxury"
                style={{ flex: 1, fontSize: "12px", padding: "10px 14px" }}
              />
              <button
                className="btn-gold"
                style={{ padding: "10px 18px", whiteSpace: "nowrap" }}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* divider */}
        <div
          style={{ height: "1px", background: "#e8e8e8", marginBottom: "24px" }}
        />

        {/* bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color: "#aaa",
              fontFamily: "Jost, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.2em",
            }}
          >
            © 2024–2025 SARANS™. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

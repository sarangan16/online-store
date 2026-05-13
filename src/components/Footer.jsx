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
          className="grid-3col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
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
                ["/#home", "Store"],
                ["/about", "Our Story"],
                ["/contact", "Contact"],
                ["/shipping", "Shipping & Returns"],
              ].map(([to, label]) => (
                <a
                  key={to}
                  href={to}
                  style={{
                    color: "#888",
                    fontFamily: "Jost, sans-serif",
                    fontSize: "13px",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#111")}
                  onMouseLeave={(e) => (e.target.style.color = "#888")}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

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
              Contact
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                "135 Stanley Thilakaratne Mawatha",
                "Nugegoda, Colombo, Sri Lanka",
                "+94 77 788 8424",
                "info.sarans@gmail.com",
                "Every day, 9am – 9pm",
              ].map((line) => (
                <p
                  key={line}
                  style={{
                    color: "#888",
                    fontFamily: "Jost, sans-serif",
                    fontSize: "13px",
                  }}
                >
                  {line}
                </p>
              ))}
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

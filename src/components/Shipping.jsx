import React, { useEffect } from "react";

const Shipping = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "80px",
        paddingBottom: "80px",
        backgroundColor: "#ffffff",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 40px" }}>
        {/* header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              color: "#999",
              fontSize: "11px",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              fontFamily: "Jost, sans-serif",
              marginBottom: "20px",
            }}
          >
            — Policies —
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "52px",
              color: "#111",
              fontWeight: 400,
              marginBottom: "20px",
            }}
          >
            Shipping & Returns
          </h1>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "#111",
              margin: "0 auto",
            }}
          />
        </div>

        {/* sections */}
        {[
          {
            title: "Shipping",
            items: [
              {
                label: "Standard Delivery",
                text: "3–5 business days within Sri Lanka. Free on orders over $60.",
              },
              {
                label: "Express Delivery",
                text: "1–2 business days. Additional charges apply at checkout.",
              },
              {
                label: "International",
                text: "We currently ship within Sri Lanka only. International shipping coming soon.",
              },
            ],
          },
          {
            title: "Returns",
            items: [
              {
                label: "Return Window",
                text: "Items can be returned within 7 days of delivery in original, unopened condition.",
              },
              {
                label: "Non-Returnable",
                text: "For hygiene reasons, opened cosmetics, skincare, and fragrances cannot be returned.",
              },
              {
                label: "Process",
                text: "Contact us at info.sarans@gmail.com with your order details to initiate a return.",
              },
            ],
          },
          {
            title: "Exchanges",
            items: [
              {
                label: "Damaged Items",
                text: "If your item arrives damaged or incorrect, we'll replace it at no cost. Contact us within 48 hours of delivery.",
              },
              {
                label: "Size & Shade",
                text: "We're happy to exchange unopened items for a different shade or size, subject to availability.",
              },
            ],
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: "56px" }}>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "32px",
                color: "#111",
                fontWeight: 400,
                marginBottom: "24px",
              }}
            >
              {section.title}
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {section.items.map((item) => (
                <div
                  key={item.label}
                  style={{ borderLeft: "2px solid #111", paddingLeft: "20px" }}
                >
                  <p
                    style={{
                      color: "#999",
                      fontSize: "10px",
                      letterSpacing: "0.4em",
                      textTransform: "uppercase",
                      fontFamily: "Jost, sans-serif",
                      marginBottom: "6px",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      color: "#555",
                      fontFamily: "Jost, sans-serif",
                      fontSize: "14px",
                      lineHeight: 1.8,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* contact */}
        <div
          style={{
            background: "#f9f9f9",
            padding: "40px",
            borderTop: "1px solid #eee",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "24px",
              color: "#111",
              marginBottom: "8px",
              fontWeight: 400,
            }}
          >
            Still have questions?
          </p>
          <p
            style={{
              color: "#555",
              fontFamily: "Jost, sans-serif",
              fontSize: "13px",
            }}
          >
            Reach us at info.sarans@gmail.com or visit us in Nugegoda, Colombo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shipping;

import React, { useEffect } from "react";

const About = () => {
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
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 40px" }}>
        {/* hero text */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
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
            — Our Story —
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(40px, 6vw, 72px)",
              color: "#111",
              lineHeight: 1.05,
              marginBottom: "20px",
              fontWeight: 400,
            }}
          >
            Beauty for everyone,
            <br />
            <span style={{ fontStyle: "italic" }}>made in Colombo.</span>
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

        {/* story section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            marginBottom: "80px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                color: "#999",
                fontSize: "10px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                fontFamily: "Jost, sans-serif",
                marginBottom: "16px",
              }}
            >
              Who We Are
            </p>
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "24px",
                color: "#111",
                lineHeight: 1.6,
                marginBottom: "20px",
                fontWeight: 400,
              }}
            >
              SARANS is a Colombo-based beauty and lifestyle destination, built
              on the belief that quality should be accessible to all.
            </p>
            <p
              style={{
                color: "#555",
                fontFamily: "Jost, sans-serif",
                fontSize: "14px",
                lineHeight: 1.9,
              }}
            >
              Founded in the heart of Nugegoda, Sri Lanka, SARANS brings
              together an carefully curated selection of cosmetics, skincare,
              fragrances, handbags, and tailoring accessories
            </p>
          </div>
          <div
            style={{
              background: "#f5f5f5",
              aspectRatio: "4/5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="SARANS"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* values */}
        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: "64px",
            marginBottom: "80px",
          }}
        >
          <p
            style={{
              color: "#999",
              fontSize: "10px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              fontFamily: "Jost, sans-serif",
              marginBottom: "48px",
              textAlign: "center",
            }}
          >
            What We Stand For
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "40px",
            }}
          >
            {[
              {
                title: "Affordable Luxury",
                text: "We believe great beauty products shouldn't break the bank. Every item in our store is priced to be accessible without compromising on quality.",
              },
              {
                title: "Trusted Brands",
                text: "We stock only genuine, branded products — from global names to local favourites — so you can shop with full confidence.",
              },
              {
                title: "Community First",
                text: "Born and raised in Colombo, SARANS is proud to serve the local community and celebrate Sri Lankan beauty culture.",
              },
            ].map((item) => (
              <div key={item.title}>
                <div
                  style={{
                    width: "24px",
                    height: "1px",
                    background: "#111",
                    marginBottom: "20px",
                  }}
                />
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "20px",
                    color: "#111",
                    marginBottom: "12px",
                    fontWeight: 400,
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    color: "#555",
                    fontFamily: "Jost, sans-serif",
                    fontSize: "13px",
                    lineHeight: 1.8,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* visit us */}
        <div
          style={{
            background: "#f9f9f9",
            padding: "48px",
            textAlign: "center",
            borderTop: "1px solid #eee",
          }}
        >
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "28px",
              color: "#111",
              marginBottom: "12px",
              fontWeight: 400,
            }}
          >
            Come say hello.
          </p>
          <p
            style={{
              color: "#555",
              fontFamily: "Jost, sans-serif",
              fontSize: "13px",
              marginBottom: "24px",
            }}
          >
            We're based in Nugegoda, Colombo — visit us in store or get in touch
            online.
          </p>
          <a
            href="/contact"
            style={{
              fontFamily: "Jost, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#111",
              textDecoration: "underline",
            }}
          >
            Contact Us →
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;

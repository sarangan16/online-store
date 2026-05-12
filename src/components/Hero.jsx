import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=90",
    tag: "New Collection",
    heading: "Beauty is\nyour art.",
    sub: "Handpicked luxury cosmetics for those who see beauty as a lifestyle.",
  },
  {
    img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1600&q=90",
    tag: "Bestsellers",
    heading: "Define your\nown glow.",
    sub: "Premium formulas. Iconic shades. Effortless elegance.",
  },
  {
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=90",
    tag: "Editor's Pick",
    heading: "Your canvas.\nYour rules.",
    sub: "Explore the SARANS collection — curated for the bold.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = SLIDES[current];

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#07060d",
      }}
    >
      {/* background images */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${s.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === current ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        />
      ))}

      {/* dark overlay left to right */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(7,6,13,0.92) 0%, rgba(7,6,13,0.6) 50%, rgba(7,6,13,0.2) 100%)",
        }}
      />

      {/* bottom fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(7,6,13,1) 0%, transparent 40%)",
        }}
      />

      {/* gold orb */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "20%",
          width: "400px",
          height: "400px",
          background: "rgba(201,168,76,0.04)",
          borderRadius: "50%",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {/* content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 40px",
            width: "100%",
          }}
        >
          <div style={{ maxWidth: "600px" }}>
            {/* tag */}
            <p
              style={{
                color: "#ffffff",
                fontSize: "11px",
                letterSpacing: "0.5em",
                textTransform: "uppercase",
                fontFamily: "Jost, sans-serif",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  width: "32px",
                  height: "1px",
                  background: "#ffffff",
                  display: "inline-block",
                }}
              />
              {slide.tag}
            </p>

            {/* heading */}
            <h1
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(52px, 8vw, 96px)",
                color: "#ede8f5",
                lineHeight: 1.05,
                marginBottom: "24px",
              }}
            >
              {slide.heading.split("\n").map((line, i) => (
                <span
                  key={i}
                  style={
                    i === 1
                      ? {
                          fontStyle: "italic",
                          display: "block",
                          color: "#ffffff",
                        }
                      : { display: "block" }
                  }
                >
                  {line}
                </span>
              ))}
            </h1>

            {/* subheading */}
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontFamily: "Jost, sans-serif",
                fontSize: "16px",
                lineHeight: 1.7,
                marginBottom: "40px",
                maxWidth: "420px",
              }}
            >
              {slide.sub}
            </p>

            {/* buttons */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="#home" className="btn-gold">
                Shop Collection
              </a>
              <Link to="/contact" className="btn-ghost">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* slide dots */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "40px",
          display: "flex",
          gap: "10px",
          zIndex: 20,
        }}
      >
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              width: idx === current ? "32px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: idx === current ? "#ffffff" : "rgba(201,168,76,0.3)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.4s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, #ffffff, transparent)",
          }}
        />
        <p
          style={{
            color: "#7a6a96",
            fontSize: "10px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            fontFamily: "Jost, sans-serif",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </p>
      </div>
    </section>
  );
};

export default Hero;

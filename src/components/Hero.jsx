import React, { useState, useEffect } from "react";
import photo1 from "../images/pic1.jpg";
import photo2 from "../images/pic2.jpg";
import photo3 from "../images/pic3.png";
import photo4 from "../images/pic4.jpg";

const images = [photo1, photo2, photo3, photo4];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    // added padding-top so it's not hidden behind fixed navbar
    <section className="relative flex flex-col justify-center items-center text-center overflow-hidden h-[90vh] pt-20 bg-black">
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${images[current]})` }}
      />

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* content */}
      <div className="relative z-10 px-6 py-12 text-white max-w-2xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide mb-4">
          Discover Your Next Favorite
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-6">
          Browse curated collections and find products you’ll love.
        </p>
        <a
          href="#home"
          className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-200 transition transform hover:-translate-y-1"
        >
          Start Shopping
        </a>
      </div>

      {/* navigation dots */}
      <div className="absolute bottom-10 flex space-x-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;

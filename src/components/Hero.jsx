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
    <section className="relative flex flex-col justify-center items-center text-center overflow-hidden h-[80vh]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${images[current]})` }}
      ></div>

      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 px-6 py-12 text-white max-w-2xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
          Discover Your Next Favorite
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          Browse curated collections and find products you love.
        </p>
        <a
          href="#home"
          className="bg-indigo-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-1"
        >
          Start Shopping
        </a>
      </div>

      <div className="absolute bottom-10 flex space-x-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              idx === current ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Hero;

import React from "react";
import SplitText from "./SplitText";

const Hero = () => {
  return (
    <div>
      <section className="py-24 text-gray-600 body-font bg-[#FF5733] overflow-x-hidden">
        <div className="container mx-auto flex flex-col md:flex-row md:px-24 md:py-10 items-center min-h-full">
          <div className="lg:flex-grow md:mt-0 flex flex-col items-center md:text-left text-center w-full">
            <SplitText
              text="Elevate Your Everyday Shopping"
              className="text-4xl sm:text-6xl md:text-8xl text-white uppercase"
              delay={100}
              duration={1.5}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;

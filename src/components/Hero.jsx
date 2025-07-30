import React from "react";
import SplitText from "./SplitText";

const Hero = () => {
  return (
    <div>
      <section className="text-gray-600 body-font bg-white bg-[#FF5733]">
        <div className="container mx-auto flex md:px-24 md:py-10 items-center">
          <div className="lg:flex-grow mt-5 md:mt-0 md:w-1/2 flex flex-col items-center md:text-left">
            <SplitText
              text="Lets Online Shop!"
              className="text-4xl sm:text-6xl md:text-8xl text-[#1d3557] font-bebas-neue uppercase font-black text-right"
              delay={100}
              duration={1.5}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </div>

          <div className="lg:w-1/2 w-3/6 mb-5 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="./images/bear1.png"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;

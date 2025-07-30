import React from "react";
import SplitText from "./SplitText";
import { CgScrollV } from "react-icons/cg";

const Hero = () => {
  return (
    <div>
      <section className="min-h-[60vh] text-gray-600 body-font bg-white bg-[#FF5733] overflow-x-hidden pt-24">
        <div className="container mx-auto flex flex-col md:flex-row md:px-24 md:py-10 items-center min-h-full">
          <div className="lg:flex-grow md:mt-0 flex flex-col items-center md:text-left text-center w-full">
            <SplitText
              text="Shop Smarter, Live Better."
              className="text-4xl sm:text-6xl md:text-8xl text-white font-mono uppercase font-black"
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

          {/*} <div className="lg:w-1/2 w-3/6 md:mb-0 md:mt-0">
            <img
              className="object-cover object-center rounded w-full"
              alt="hero"
              src="./images/bear1.png"
            />
          </div>*/}
        </div>
      </section>
    </div>
  );
};

export default Hero;

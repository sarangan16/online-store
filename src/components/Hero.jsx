import React from "react";

const Hero = () => {
  return (
    <div>
      <main className="dark:bg-gray-800 bg-white relative overflow-hidden">
        <div className="bg-white dark:bg-[#e63946] flex items-center justify-between relative z-20 overflow-hidden">
          <div className="container mx-auto px-6 flex py-16 w-full">
            <div className="sm:w-2/3 lg:w-2/5 flex flex-col justify-center text-right">
              <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                Buy on
                <span className="text-5xl sm:text-7xl">Time</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-700 dark:text-white">
                Dimension of reality that makes change possible and
                understandable. An indefinite and homogeneous environment in
                which natural events and human existence take place.
              </p>
            </div>

            <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
              <img
                src="/images/bear1.png"
                className="max-w-xs md:max-w-sm m-auto w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;

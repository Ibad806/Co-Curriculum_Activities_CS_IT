import React from "react";
import ssuetlogo from '../assets/ssuetlogo.png'

const Cacmain = () => {
  return (
    <>
      <section className="relative bg-gradient-to-r from-[#0B0D2C] to-indigo-900 text-white h-[100vh] flex items-center justify-center flex-col px-8">
        <div className="container mx-auto flex flex-col items-center justify-center text-center">
          <div className="flex items-center space-x-4 md:flex-row flex-col gap-20">
            {/* Replace `logoPath` with your logo path */}
            <h1 className="text-[100px] font-bold tracking-wide">CAC</h1>
            <img
              src={ssuetlogo}
              alt="Sir Syed University Logo"
              className="w-[500px] h-fit object-cover"
            />
          </div>
          <p className="mt-12 md:text-[30px] text-[20px] font-semibold leading-[30px]">
            Sir Syed University of Engineering & Technology
          </p>
        </div>
      </section>
    </>
  );
};

export default Cacmain;

import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const Header = () => {

  const { setShowLogin, token,user } = useContext(StoreContext);


  const handleOrderNow = () => {
  const section = document.getElementById("food-display");

  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};


  return (
    <div className="relative w-full min-h-[85vh] flex items-center pt-32 pb-16 px-6 sm:px-10 lg:px-20 overflow-hidden bg-linear-to-br from-[#fffaf5] to-[#fdf0e6]">

      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ff5a00]/5 rounded-l-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#ff5a00]/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-12 relative z-10">

        {/* Left Section */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:gap-8">

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Food, without the <br className="hidden lg:block" />
            <span className="text-[#ff5a00]">wait.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 font-medium max-w-lg">
            Fresh meals delivered in minutes. Explore top restaurants and order
            your favorite meals with ease, delivered hot & fresh to your door.
          </p>

          {!token ? (
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
              <button 
              onClick={handleOrderNow}
              className="w-full sm:w-auto bg-[#ff5a00] hover:bg-[#e04f00] text-white px-8 py-3.5 rounded-full font-bold text-lg shadow-[0_8px_20px_rgba(255,90,0,0.3)] hover:shadow-[0_10px_25px_rgba(255,90,0,0.4)] hover:-translate-y-1 transition-all duration-300">
                Order Now
              </button>

              <button
                onClick={() => setShowLogin(true)}
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-3.5 rounded-full font-bold text-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
              {/* Designed Welcome Badge */}
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-gray-100 px-4 py-2 rounded-full shadow-sm">
                <div className="w-10 h-10 bg-[#ff5a00]/10 text-[#ff5a00] rounded-full flex items-center justify-center font-bold text-lg">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "👋"}
                </div>
                <div className="text-left pr-3">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider leading-tight">
                    Welcome back
                  </p>
                  <p className="text-base font-bold text-gray-800 leading-tight">
                    {user?.name || "Foodie"}
                  </p>
                </div>
              </div>

              {/* Retained CTA for logged-in users */}
              <button 
              onClick={handleOrderNow}
              className="w-full sm:w-auto bg-[#ff5a00] hover:bg-[#e04f00] text-white px-8 py-3.5 rounded-full font-bold text-lg shadow-[0_8px_20px_rgba(255,90,0,0.3)] hover:shadow-[0_10px_25px_rgba(255,90,0,0.4)] hover:-translate-y-1 transition-all duration-300">
                Order Now
              </button>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex-1 w-full flex justify-center lg:justify-end relative">

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#ff5a00]/20 blur-[80px] rounded-full -z-10"></div>

          <img
            src={assets.header_img}
            alt="Delicious food"
            className="w-full max-w-87.5 sm:max-w-112.5 lg:max-w-150 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
          />

        </div>

      </div>
    </div>
  );
};

export default Header;
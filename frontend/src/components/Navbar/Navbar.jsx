
import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ showLogin, setShowLogin }) => {
  const { cartItems,token,setToken } = useContext(StoreContext);
  const cartCount = Object.keys(cartItems).length;
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }

  return (
    // Sticky wrapper with z-index to stay on top
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8">
      
      {/* Glassmorphism Container */}
      <nav className=" mx-auto bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300">

        {/* Logo */}
        <div 
          className="shrink-0 flex items-center cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <img 
            src={assets.logo} 
            alt="logo" 
            className="h-8 md:h-10 w-auto object-contain hover:scale-105 transition-transform duration-300" 
          />
        </div>

        {/* Center Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-800 font-semibold text-lg tracking-wide">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-[#ff5a00] transition-colors"
                  : "hover:text-[#ff5a00] transition-colors"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <span
              onClick={() => {
                navigate("/");
                setTimeout(() => document.getElementById("explore-menu")?.scrollIntoView({ behavior: "smooth" }), 100);
              }}
              className="cursor-pointer hover:text-[#ff5a00] transition-colors"
            >
              Menu
            </span>
          </li>
          <li>
            <span
              onClick={() => {
                navigate("/");
                setTimeout(() => document.getElementById("mobile-app")?.scrollIntoView({ behavior: "smooth" }), 100);
              }}
              className="cursor-pointer hover:text-[#ff5a00] transition-colors"
            >
              About
            </span>
          </li>
          <li>
            <span
              onClick={() => {
                navigate("/");
                setTimeout(() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" }), 100);
              }}
              className="cursor-pointer hover:text-[#ff5a00] transition-colors"
            >
              Contact
            </span>
          </li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-5 md:gap-6">

          {/* Cart Icon & Badge */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/30 transition-colors"
          >
            <img
              src={assets.basket_icon}
              alt="cart"
              className="w-auto h-8 object-contain"
            />
            {cartCount > 0 && (
              <span className="absolute top-1 right-0 translate-x-1 -translate-y-1 bg-[#ff5a00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md border border-white">
                {cartCount}
              </span>
            )}
          </div>

          {/* Profile & Auth Section */}
{!token ? (
  <button
    onClick={() => setShowLogin(true)}
    className="bg-[#ff5a00] hover:bg-[#e04f00] text-white text-sm font-bold px-8 py-3 rounded-full shadow-[0_10px_20px_rgba(255,90,0,0.2)] hover:shadow-[0_15px_30px_rgba(255,90,0,0.3)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
  >
    Sign In
  </button>
) : (
  <div className="relative group">
    {/* Profile Avatar Trigger */}
    <div className="flex items-center gap-2 cursor-pointer p-1 pr-3 rounded-full hover:bg-white/50 transition-all border border-transparent hover:border-white/50">
      <div className="w-10 h-10 rounded-full border-2 border-[#ff5a00] p-0.5 shadow-sm">
        <img 
          src={assets.profile_icon} 
          alt="Profile" 
          className="w-full h-full rounded-full object-cover bg-gray-100 px-0.75" 
        />
      </div>
      <img src={assets.dropdown_icon} alt="" className="w-2.5 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
    </div>

    {/* Elegant Dropdown Menu */}
    <ul className="absolute right-0 mt-2 w-52 bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/50 py-3 flex flex-col gap-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-right scale-95 group-hover:scale-100 z-50">
      
      <li 
        // onClick={() => navigate('/myorders')}
        className="flex items-center gap-3 px-5 py-3 hover:bg-[#ff5a00]/5 cursor-pointer transition-colors group/item"
      >
        <img src={assets.bag_icon} alt="" className="w-5 opacity-70 group-hover/item:opacity-100" />
        <p className="text-sm font-bold text-gray-700 group-hover/item:text-[#ff5a00]">Orders</p>
      </li>

      <div className="h-px bg-gray-100 mx-4 my-1"></div>

      <li 
        onClick={logOut}
        className="flex items-center gap-3 px-5 py-3 hover:bg-red-50 cursor-pointer transition-colors group/item"
      >
        <img src={assets.logout_icon} alt="" className="w-5 opacity-70 group-hover/item:opacity-100" />
        <p className="text-sm font-bold text-gray-700 group-hover/item:text-red-500">Logout</p>
      </li>
      
    </ul>
  </div>
)}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

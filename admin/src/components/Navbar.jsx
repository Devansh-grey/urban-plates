import React from 'react'
import { assets } from '../assets/assets.js'

const Navbar = () => {
  return (
    <div className='w-full bg-white border-b border-gray-100 px-[4%] py-4 flex justify-between items-center sticky top-0 z-100 shadow-xs'>
        
        {/* Logo and Tag */}
        <div className='flex items-center gap-4'>
            <img src={assets.logo} alt="Urban Plates Logo" className="h-10 w-auto" />
            <div className="hidden sm:flex flex-col border-l border-gray-200 pl-4">
                <p className='text-sm font-black text-gray-900 uppercase tracking-widest'>Admin Panel</p>
                <p className='text-[10px] text-gray-400 font-bold uppercase'>Management Suite</p>
            </div>
        </div>

        {/* Profile Section */}
        <div className='flex items-center gap-4'>
            <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">Administrator</p>
                <p className="text-xs text-[#ff5a00] font-medium">Online</p>
            </div>
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-gray-50 shadow-sm p-0.5 bg-linear-to-tr from-[#ff5a00] to-orange-300">
                <img className='w-full h-full object-cover rounded-[14px] bg-white' src={assets.profile_image} alt="Admin Profile" />
            </div>
        </div>
      
    </div>
  )
}

export default Navbar
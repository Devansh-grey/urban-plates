
import React from 'react';
import { assets } from '../../assets/assets';

const MobileApp = () => {
  return (
    <div className='max-w-400 mx-auto px-6 sm:px-12 lg:px-20 py-24' id='mobile-app'>
        <div className="bg-linear-to-r from-[#ff5a00] to-[#ff7a33] rounded-[3rem] p-12 md:p-20 text-center shadow-[0_20px_50px_rgba(255,90,0,0.2)] relative overflow-hidden">
            
            {/* Decorative white circles to match the 'dots' in your reference image */}
            <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col items-center gap-8">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl">
                    For a Better Experience <br /> Download Our App
                </h2>
                
                <p className="text-orange-50 text-lg md:text-xl font-medium max-w-xl">
                    Get exclusive deals, track your orders in real-time, and enjoy a seamless ordering experience right from your phone.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
                    <img 
                        src={assets.play_store} 
                        alt="Play Store" 
                        className="w-44 md:w-52 cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-xl" 
                    />
                    <img 
                        src={assets.app_store} 
                        alt="App Store" 
                        className="w-44 md:w-52 cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-xl" 
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default MobileApp;
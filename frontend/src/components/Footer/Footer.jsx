
import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    // Added w-full and removed any relative/absolute that might cause floating
    <footer className='w-full bg-[#111827] text-gray-400 pt-24 pb-12 px-6 sm:px-12 lg:px-20 mt-auto' id='footer'>
        <div className="max-w-400 mx-auto">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                
                {/* Brand Column */}
                <div className="flex flex-col gap-8 lg:col-span-2">
                    <img className="h-10 w-fit brightness-0 invert" src={assets.logo} alt="Logo" />
                    <p className="text-lg leading-relaxed max-w-md">
                        Deliciously fresh, locally sourced, and delivered with speed. Join us on our mission to bring quality dining to your doorstep.
                    </p>
                    <div className="flex items-center gap-5">
                        <div className="w-11 h-11 rounded-full border border-gray-800 flex items-center justify-center hover:bg-[#ff5a00] hover:border-[#ff5a00] transition-all cursor-pointer group">
                            <img src={assets.facebook_icon} alt="" className="w-5 group-hover:brightness-0 group-hover:invert" />
                        </div>
                        <div className="w-11 h-11 rounded-full border border-gray-800 flex items-center justify-center hover:bg-[#ff5a00] hover:border-[#ff5a00] transition-all cursor-pointer group">
                            <img src={assets.twitter_icon} alt="" className="w-5 group-hover:brightness-0 group-hover:invert" />
                        </div>
                        <div className="w-11 h-11 rounded-full border border-gray-800 flex items-center justify-center hover:bg-[#ff5a00] hover:border-[#ff5a00] transition-all cursor-pointer group">
                            <img src={assets.linkedin_icon} alt="" className="w-5 group-hover:brightness-0 group-hover:invert" />
                        </div>
                    </div>
                </div>

                {/* Company Links */}
                <div className="flex flex-col gap-8">
                    <h4 className="text-white text-xs font-black uppercase tracking-[0.2em]">Company</h4>
                    <ul className="flex flex-col gap-4 text-lg font-medium">
                        <li className="hover:text-white transition-colors cursor-pointer">Home</li>
                        <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Delivery</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-8">
                    <h4 className="text-white text-xs font-black uppercase tracking-[0.2em]">Support</h4>
                    <ul className="flex flex-col gap-4 text-lg font-medium">
                        <li className="hover:text-white transition-colors cursor-pointer">+1-212-456-7890</li>
                        <li className="hover:text-white transition-colors cursor-pointer">hello@urbanplates.com</li>
                    </ul>
                </div>
            </div>

            <div className="pt-10 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                <p>© 2026 Urban Plates. Crafted for your appetite.</p>
                <div className="flex gap-10 font-bold uppercase tracking-widest text-[10px]">
                    <span className="cursor-pointer hover:text-white">Terms</span>
                    <span className="cursor-pointer hover:text-white">Privacy</span>
                    <span className="cursor-pointer hover:text-white">Cookies</span>
                </div>
            </div>
            
        </div>
    </footer>
  )
}

export default Footer;
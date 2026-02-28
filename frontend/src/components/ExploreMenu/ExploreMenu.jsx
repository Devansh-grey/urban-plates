
import React from 'react';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-12 flex flex-col gap-8' id='explore-menu'>
            
            {/* Header Section */}
            <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Explore Our Menu</h3>
                <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">
                    Freshly prepared meals for every mood. Choose from a diverse menu featuring a delectable array of dishes.
                </p>
            </div>
            
            {/* Horizontal Scrollable Menu List */}
            <div className="flex items-center justify-start lg:justify-center gap-8 overflow-x-auto py-6 scrollbar-hide">
                {menu_list.map((item, index) => {
                    const isActive = category === item.menu_name;
                    return (
                        <div 
                            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
                            key={index} 
                            className="flex flex-col items-center gap-3 cursor-pointer group min-w-22.5"
                        >
                            {/* Circular Image Container with Active State Glow */}
                            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full p-1 transition-all duration-300 ${
                                isActive 
                                ? 'bg-[#ff5a00] shadow-[0_0_20px_rgba(255,90,0,0.3)] scale-110' 
                                : 'bg-transparent hover:bg-[#ff5a00]/20'
                            }`}>
                                <img 
                                    src={item.menu_image} 
                                    alt={item.menu_name} 
                                    className="w-full h-full object-cover rounded-full bg-white shadow-sm"
                                />
                            </div>
                            
                            {/* Menu Label */}
                            <p className={`text-sm md:text-base transition-colors ${
                                isActive 
                                ? 'text-[#ff5a00] font-bold' 
                                : 'text-gray-600 font-medium group-hover:text-gray-900'
                            }`}>
                                {item.menu_name}
                            </p>
                        </div>
                    );
                })}
            </div>
            
            {/* Soft Divider */}
            <hr className="mt-4 border-gray-200" />
        </div>
    );
}

export default ExploreMenu;

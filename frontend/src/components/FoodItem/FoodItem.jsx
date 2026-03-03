
import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id, name, desc, price, image }) => {
    const { addToCart, removeFromCart, cartItems,url } = useContext(StoreContext);

    return (
        // Clean white card that sits on the cream background
        <div className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2">
            
            {/* Image Section */}
            <div className="relative overflow-hidden aspect-4/3">
                <img 
                    src={url+"/images/"+image} 
                    alt={name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Floating Add/Remove Controls */}
                <div className="absolute bottom-5 right-5 flex items-center">
                    {!cartItems[id] ? (
                        <div 
                            onClick={() => addToCart(id)}
                            className="w-11 h-11 bg-white hover:bg-[#ff5a00] rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 group/icon"
                        >
                            <img src={assets.add_icon_white} alt="" className="w-5 invert group-hover/icon:invert-0" />
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm p-1.5 rounded-full shadow-xl border border-white">
                            <img 
                                onClick={() => removeFromCart(id)} 
                                src={assets.remove_icon_red} 
                                className="w-8 h-8 cursor-pointer transition-transform active:scale-90" 
                                alt="remove" 
                            />
                            <p className="font-bold text-gray-800 text-sm">{cartItems[id]}</p>
                            <img 
                                onClick={() => addToCart(id)} 
                                src={assets.add_icon_green} 
                                className="w-8 h-8 cursor-pointer transition-transform active:scale-90" 
                                alt="add" 
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section with more breathing room (p-8) */}
            <div className="p-8 flex flex-col grow gap-4">
                <div className="flex justify-between items-start">
                    <h4 className="text-xl font-extrabold text-gray-900 leading-tight">
                        {name}
                    </h4>
                    <img src={assets.rating_starts} alt="Rating" className="h-3.5 object-contain mt-1.5" />
                </div>
                
                <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2">
                    {desc}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-2">
                    <p className="text-[#ff5a00] font-black text-2xl flex items-start">
                        <span className="text-sm mt-1 mr-0.5">$</span>{price}
                    </p>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">
                        Fresh
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FoodItem;
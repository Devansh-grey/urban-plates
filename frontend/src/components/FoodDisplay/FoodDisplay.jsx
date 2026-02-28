

import React, { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);
    
    return (
        // Changed max-w-7xl to max-w-[1600px] to use more screen width
        // Removed solid white bg to let the global cream color show through
        <div className='max-w-400 mx-auto px-6 sm:px-12 lg:px-20 py-16' id='food-display'>
            <div className="flex flex-col gap-3 mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                    Top dishes near you
                </h2>
                <div className="w-24 h-1.5 bg-[#ff5a00] rounded-full"></div>
            </div>
            
            {/* Grid adjustments: Responsive columns and much larger gaps (gap-10) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-8 gap-y-16">
                {food_list.filter((item) => category === "All" || item.category === category).map((item) => {
                    return (
                        <FoodItem 
                            key={item._id} 
                            id={item._id} 
                            name={item.name} 
                            desc={item.description} 
                            price={item.price} 
                            image={item.image}  
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default FoodDisplay;
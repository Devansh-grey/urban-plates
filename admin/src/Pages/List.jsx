import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";

const List = () => {
    const url = 'http://localhost:4000'
    const [list, setlist] = useState([])

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`)
            if (response.data.success) {
                setlist(response.data.food)
            }
        } catch (error) {
            toast.error("Error fetching list")
        }
    }

    const removeFood = async (foodId) => {
        try{
            const response = await axios.delete(`${url}/api/food/remove/${foodId}`)
            fetchList();
            if (response.data.success) {
                toast.success(response.data.message)
            }else{
                            toast.error(response.data.message)
                        }
        } catch(error){
            console.log(error);
            
        }
        
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div className='w-full animate-in fade-in duration-500'>
            <div className='mb-8 flex justify-between items-end'>
                <div>
                    <h2 className='text-3xl font-extrabold text-gray-900'>Menu Inventory</h2>
                    <p className='text-gray-500 font-medium mt-1'>Manage your active dishes and pricing.</p>
                </div>
                <div className='bg-white px-6 py-2 rounded-2xl border border-gray-100 shadow-sm'>
                    <p className='text-xs font-black text-gray-400 uppercase tracking-widest'>Total Items</p>
                    <p className='text-xl font-bold text-[#ff5a00]'>{list.length}</p>
                </div>
            </div>

            <div className='bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 overflow-hidden'>
                {/* Table Header */}
                <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center px-10 py-6 bg-gray-50/50 border-b border-gray-100 text-xs font-black text-gray-400 uppercase tracking-widest'>
                    <p>Image</p>
                    <p>Name</p>
                    <p>Category</p>
                    <p>Price</p>
                    <p className='text-center'>Action</p>
                </div>

                {/* Table Rows */}
                <div className='flex flex-col'>
                    {list.map((item, index) => {
                        return (
                            <div key={index} className='grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center px-6 md:px-10 py-5 border-b border-gray-50 last:border-0 hover:bg-orange-50/20 transition-colors group'>
                                
                                {/* Image */}
                                <div className='w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 shadow-sm'>
                                    <img 
                                        src={`${url}/images/${item.image}`} 
                                        alt={item.name} 
                                        className='w-full h-full object-cover transition-transform group-hover:scale-110' 
                                    />
                                </div>

                                {/* Name */}
                                <p className='text-lg font-bold text-gray-900 md:pl-0 pt-4 md:pt-0'>{item.name}</p>

                                {/* Category */}
                                <div>
                                    <span className='px-4 py-1.5 bg-gray-100 text-gray-500 text-xs font-bold rounded-full uppercase tracking-wider'>
                                        {item.category}
                                    </span>
                                </div>

                                {/* Price */}
                                <p className='text-xl font-black text-gray-900'>
                                    <span className='text-[#ff5a00] text-sm mr-0.5'>₹</span>{item.price}
                                </p>

                                {/* Action */}
                                <div className='flex justify-center gap-4 pt-4 md:pt-0'>
                                    <button 
                                        onClick={() => removeFood(item._id)}
                                        className='w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90 shadow-sm'
                                        title="Delete Item"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                
                {list.length === 0 && (
                    <div className='py-20 text-center flex flex-col items-center gap-4'>
                        <div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-3xl opacity-20'>🍽️</div>
                        <p className='text-gray-400 font-bold'>No items found in your inventory.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default List
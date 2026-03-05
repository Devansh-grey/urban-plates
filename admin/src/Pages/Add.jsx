import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from "react-toastify";

const Add = () => {

    const [loading, setLoading] = useState(false);
    const url = 'http://localhost:4000'
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault()
        setLoading(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("description", data.description);
        formData.append("image", image);
        try {
            const response = await axios.post(`${url}/api/food/add`, formData)

            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                })
                setImage(false)
                toast.success(response.data.message)
                setLoading(false);
            } else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            

        }
    }

    return (
        <div className='w-full animate-in fade-in slide-in-from-bottom-4 duration-500'>
            <div className='mb-8'>
                <h2 className='text-3xl font-extrabold text-gray-900'>Add New Item</h2>
                <p className='text-gray-500 font-medium mt-1'>Create a new culinary masterpiece for your menu.</p>
            </div>

            <form className='flex flex-col lg:flex-row gap-10' onSubmit={onSubmitHandler} >

                {/* Left Column: Image Upload */}
                <div className='flex-1 max-w-87.5'>
                    <div className='bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col items-center text-center'>
                        <p className='text-sm font-black text-gray-400 uppercase tracking-widest mb-6'>Display Image</p>
                        <label htmlFor="image" className='cursor-pointer group relative w-full aspect-square bg-gray-50 rounded-4xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden hover:border-[#ff5a00] hover:bg-orange-50/30 transition-all'>
                            <img
                                src={image ? URL.createObjectURL(image) : assets.upload_area}
                                alt=""
                                className={image ? 'w-full h-full object-cover' : 'w-12 opacity-40 group-hover:scale-110 transition-transform'}
                            />
                            {!image && <p className='text-xs font-bold text-gray-400 mt-4 group-hover:text-[#ff5a00]'>Click to upload</p>}
                        </label>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                        <p className='text-[10px] text-gray-400 mt-6 leading-relaxed'>
                            PNG, JPG or WEBP. <br /> Recommended size: 1000x1000px.
                        </p>
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className='flex-2 bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 space-y-8'>

                    <div className='space-y-6'>
                        {/* Name Input */}
                        <div className='flex flex-col gap-2'>
                            <label className='text-xs font-black text-gray-400 uppercase tracking-widest ml-1'>Product Name</label>
                            <input
                                onChange={onChangeHandler} value={data.name}
                                className='w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/5 transition-all font-bold text-gray-900 placeholder:text-gray-300'
                                type="text" name='name' placeholder='e.g. Greek Goddess Salad' required
                            />
                        </div>

                        {/* Description Input */}
                        <div className='flex flex-col gap-2'>
                            <label className='text-xs font-black text-gray-400 uppercase tracking-widest ml-1'>Description</label>
                            <textarea
                                onChange={onChangeHandler} value={data.description}
                                className='w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/5 transition-all font-medium text-gray-700 placeholder:text-gray-300 resize-none'
                                rows={4} name='description' placeholder='Describe the ingredients and flavors...' required
                            />
                        </div>

                        {/* Category and Price Row */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-black text-gray-400 uppercase tracking-widest ml-1'>Category</label>
                                <select
                                    onChange={onChangeHandler}
                                    className='w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#ff5a00] transition-all font-bold text-gray-700 cursor-pointer appearance-none'
                                    name="category"
                                >
                                    <option value="Salad">Salad</option>
                                    <option value="Rolls">Rolls</option>
                                    <option value="Desert">Desert</option>
                                    <option value="Cake">Cake</option>
                                    <option value="Pure Veg">Pure Veg</option>
                                    <option value="Pasta">Pasta</option>
                                    <option value="Noodles">Noodles</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-black text-gray-400 uppercase tracking-widest ml-1'>Price (₹)</label>
                                <input
                                name='price'
                                value={data.price}
                                onChange={onChangeHandler}
                                    className='w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/5 transition-all font-bold text-gray-900'
                                    type="number" placeholder='25' required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        type='submit'
                        className='w-full py-5 bg-[#ff5a00] text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_15px_30px_rgba(255,90,0,0.25)] hover:bg-[#e04f00] hover:-translate-y-1 transition-all active:scale-95'
                    >
                         {loading ? "Adding..." : "Add Food"}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Add
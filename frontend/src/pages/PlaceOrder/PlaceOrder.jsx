
import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'

const PlaceOrder = () => {
  const { getTotalCartAmount, food_list, cartItems } = useContext(StoreContext)
  const totalAmount = getTotalCartAmount(food_list
     .filter(item => cartItems[item._id]));

  return (
    <form className='min-h-screen pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-400 mx-auto flex flex-col lg:flex-row gap-10 xl:gap-20 items-start'>
      
      {/* Left Side: Delivery Information */}
      <div className="w-full lg:flex-2 flex flex-col gap-10">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Delivery Information</h2>
          <div className="w-20 h-1.5 bg-[#ff5a00] rounded-full"></div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
              type="text" placeholder='First name' required 
            />
            <input 
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
              type="text" placeholder='Last name' required 
            />
          </div>

          <input 
            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
            type="email" placeholder='Email address' required 
          />
          
          <input 
            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
            type="text" placeholder='Phone number' required 
          />

          <div className="space-y-4">
            <input 
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
              type="text" placeholder='Street Address' required 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
                type="text" placeholder='City' required 
              />
              <input 
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
                type="text" placeholder='State' required 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
                type="text" placeholder='Zip code' required 
              />
              <input 
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
                type="text" placeholder='Country' required 
              />
            </div>
          </div>
        </div>
      </div>

     {/* Right Side: Order Summary Card */}
{totalAmount > 0 && (
  <div className="flex-1 lg:min-w-100"> {/* Increased min-width for larger presence */}
    <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 sticky top-32">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">Order Summary</h2>
      
      <div className="flex flex-col gap-6 text-gray-600 font-medium">
        <div className="flex justify-between items-center text-lg">
          <p>Subtotal</p>
          <p className="text-gray-900 font-bold">${totalAmount}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Delivery Fee</p>
          <p className="text-gray-900 font-bold">${totalAmount > 0 ? 2 : 0}</p>
        </div>
        
        {/* Soft Decorative Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent my-2"></div>
        
        <div className="flex justify-between items-center text-2xl font-black text-gray-900">
          <p>Grand Total</p>
          <p className="text-[#ff5a00]">${totalAmount > 0 ? totalAmount + 2 : 0}</p>
        </div>
      </div>

      <button 
        onClick={() => navigate('/order')}
        className="w-full mt-10 bg-[#ff5a00] hover:bg-[#e04f00] text-white py-5 rounded-2xl font-bold text-lg shadow-[0_12px_24px_rgba(255,90,0,0.25)] transition-all active:scale-95 uppercase tracking-wider"
      >
        Proceed to Checkout
      </button>

      {/* Promo Code Section - styled to feel wider */}
      <div className="mt-10 pt-8 border-t border-gray-100">
        <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 text-center">Promotional Code</p>
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
          <input 
            type="text" 
            placeholder="Enter code" 
            className="flex-1 bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl outline-none focus:border-[#ff5a00] transition-all"
          />
          <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors">Apply</button>
        </div>
      </div>
    </div>
  </div>
)}

    </form>
  )
}

export default PlaceOrder
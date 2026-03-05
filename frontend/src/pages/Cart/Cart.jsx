
import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount,url } = useContext(StoreContext)
  const navigate = useNavigate();
  const totalAmount = getTotalCartAmount();

  return (
    // min-h-screen ensures the page takes up full height, pushing the footer down
    <div className='min-h-screen pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-400 mx-auto'>
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Your Shopping Bag</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Cart Items List */}
        <div className="flex-2">
          <div className="hidden md:grid grid-cols-5 pb-6 border-b border-gray-200 text-gray-400 font-bold text-xs uppercase tracking-widest">
            <p className="col-span-2">Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p className="text-right">Total</p>
          </div>

          <div className="flex flex-col">
            {food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={item._id} className="grid grid-cols-1 md:grid-cols-5 items-center py-8 border-b border-gray-100 gap-6">
                    {/* Product Info */}
                    <div className="col-span-2 flex items-center gap-6">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
                        <img src={url+"/images/"+item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{item.name}</p>
                        <p className="text-gray-400 text-sm">{item.category}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <p className="text-gray-600 font-semibold hidden md:block">₹{item.price}</p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 bg-gray-50 w-fit px-3 py-2 rounded-full border border-gray-100">
                      <img 
                        onClick={() => removeFromCart(item._id)} 
                        src={assets.remove_icon_red} 
                        className="w-6 cursor-pointer hover:scale-110 transition-transform" 
                      />
                      <span className="font-bold text-gray-900 w-4 text-center">{cartItems[item._id]}</span>
                      <img 
                        onClick={() => addToCart(item._id)} 
                        src={assets.add_icon_green} 
                        className="w-6 cursor-pointer hover:scale-110 transition-transform" 
                      />
                    </div>

                    {/* Total */}
                    <p className="text-right text-lg font-bold text-[#ff5a00] hidden md:block">
                      ₹{item.price * cartItems[item._id]}
                    </p>
                  </div>
                )
              }
              return null;
            })}
          </div>

          {totalAmount === 0 && (
            <div className="py-20 text-center">
              <p className="text-2xl text-gray-400 font-medium mb-6">Your cart is empty</p>
              <button 
                onClick={() => navigate('/')}
                className="bg-[#ff5a00] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#e04f00] transition-colors"
              >
                Go to Menu
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Order Summary Card */}
        {totalAmount > 0 && (
          <div className="flex-1">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 sticky top-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>
              
              <div className="flex flex-col gap-5 text-gray-600 font-medium">
                <div className="flex justify-between items-center">
                  <p>Subtotal</p>
                  <p className="text-gray-900">₹{totalAmount}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p>Delivery Fee</p>
                  <p className="text-gray-900">₹{totalAmount > 0 ? 2 : 0}</p>
                </div>
                <hr className="border-gray-100 my-2" />
                <div className="flex justify-between items-center text-xl font-extrabold text-gray-900">
                  <p>Grand Total</p>
                  <p className="text-[#ff5a00]">₹{totalAmount > 0 ? totalAmount + 2 : 0}</p>
                </div>
              </div>

              <button 
                onClick={() => navigate('/order')}
                className="w-full mt-10 bg-[#ff5a00] hover:bg-[#e04f00] text-white py-4 rounded-2xl font-bold text-lg shadow-[0_10px_20px_rgba(255,90,0,0.3)] transition-all active:scale-95"
              >
                Proceed to Checkout
              </button>

              {/* Promo Code Section */}
              <div className="mt-8">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Have a promo code?</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter code" 
                    className="flex-1 bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-[#ff5a00] transition-colors"
                  />
                  <button className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-colors">Apply</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Cart

import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import loadRazorpay from '../../utils/razorpay';
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const { getTotalCartAmount, food_list, cartItems, token, url, clearCart } = useContext(StoreContext)
  const totalAmount = getTotalCartAmount();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: ""
  })
  const navigate = useNavigate()

  const onCHangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value
    setData(prev => ({ ...prev, [name]: value }))
  }


  const placeOrder = async (event) => {
    event.preventDefault();

    if (loading) return;
    setLoading(true);

    try {

      const res = await loadRazorpay();

      if (!res) {
        toast.error("Razorpay failed to load");
        setLoading(false);
        return;
      }

      const orderItems = food_list
        .filter(item => cartItems[item._id] > 0)
        .map(item => ({
          ...item,
          quantity: cartItems[item._id]
        }));

      const orderData = {
        address: data,
        items: orderItems,
        amount: totalAmount + 2
      };

      const response = await axios.post(
        `${url}/api/order/place`,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success) {
        toast.error("Order creation failed");
        setLoading(false);
        return;
      }

      const { razorpayOrder, orderId } = response.data;
      toast.loading("Opening payment gateway...");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Urban Plates",
        description: "Food payment",
        order_id: razorpayOrder.id,

        handler: async function (paymentResponse) {
          try {

            const verifyRes = await axios.post(
              `${url}/api/order/verify`,
              { ...paymentResponse, orderId },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (verifyRes.data.success) {
              navigate("/myorders", { state: { paymentSuccess: true } });
              clearCart()
            } else {
              toast.error("Payment verification failed");
            }

          } catch (error) {
            console.error(error);
            toast.error("Verification error");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      toast.dismiss();

      rzp.on("payment.failed", function () {
        toast.error("Payment failed");
        setLoading(false);
      });

      rzp.open();

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/")
      alert("login first")
    }
  })

  return (
    <form onSubmit={placeOrder}
      className='min-h-screen pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-400 mx-auto flex flex-col lg:flex-row gap-10 xl:gap-20 items-start'>

      {/* Left Side: Delivery Information */}
      <div className="w-full lg:flex-2 flex flex-col gap-10">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Delivery Information</h2>
          <div className="w-20 h-1.5 bg-[#ff5a00] rounded-full"></div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              onChange={onCHangeHandler} name='firstName' value={data.firstName}
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
              type="text" placeholder='First name' required
            />
            <input
              onChange={onCHangeHandler} name='lastName' value={data.lastName}
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
              type="text" placeholder='Last name' required
            />
          </div>

          <input
            onChange={onCHangeHandler} name='email' value={data.email}
            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
            type="email" placeholder='Email address' required
          />

          <input
            onChange={onCHangeHandler} name='phone' value={data.phone}
            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
            type="text" placeholder='Phone number' required
          />

          <div className="space-y-4">
            <input
              onChange={onCHangeHandler} name='street' value={data.street}
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
              type="text" placeholder='Street Address' required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                onChange={onCHangeHandler} name='city' value={data.city}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
                type="text" placeholder='City' required
              />
              <input
                onChange={onCHangeHandler} name='state' value={data.state}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
                type="text" placeholder='State' required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                onChange={onCHangeHandler} name='zipcode' value={data.zipcode}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium shadow-sm"
                type="text" placeholder='Zip code' required
              />
              <input
                onChange={onCHangeHandler} name='country' value={data.country}
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
                <p className="text-gray-900 font-bold">₹{totalAmount}</p>
              </div>
              <div className="flex justify-between items-center text-lg">
                <p>Delivery Fee</p>
                <p className="text-gray-900 font-bold">₹{totalAmount > 0 ? 2 : 0}</p>
              </div>

              {/* Soft Decorative Divider */}
              <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent my-2"></div>

              <div className="flex justify-between items-center text-2xl font-black text-gray-900">
                <p>Grand Total</p>
                <p className="text-[#ff5a00]">₹{totalAmount > 0 ? totalAmount + 2 : 0}</p>
              </div>
            </div>

            <button
              disabled={loading}
              type='submit'
              className="w-full mt-10 bg-[#ff5a00] hover:bg-[#e04f00] text-white py-5 rounded-2xl font-bold text-lg shadow-[0_12px_24px_rgba(255,90,0,0.25)] transition-all active:scale-95 uppercase tracking-wider"
            >
              {loading ? "Processing..." : "Place Order"}
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
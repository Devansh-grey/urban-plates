import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const url = "http://localhost:4000";

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${url}/api/order/list`);
      if (data.success) {
        // Sort by date - newest first
        const sortedOrders = [...data.data].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setOrders(sortedOrders);
      }
    } catch (error) {
      toast.error("Error fetching orders");
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status,
      });
      if (response.data.success) {
        await getOrders();
        toast.success("Status Updated");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="w-full animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900">Order Management</h2>
        <p className="text-gray-500 font-medium mt-1">Track and update active deliveries across your network.</p>
      </div>

      <div className="flex flex-col gap-6">
        {orders.map((order, index) => (
          <div
            key={order._id || index}
            className="bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col xl:flex-row gap-8 items-start xl:items-center group"
          >
            {/* 1. Parcel Icon Section */}
            <div className="hidden md:flex w-20 h-20 shrink-0 bg-orange-50 rounded-3xl items-center justify-center border border-orange-100 group-hover:bg-[#ff5a00] transition-colors duration-500">
              <img src={assets.parcel_icon} alt="" className="w-10 group-hover:brightness-0 group-hover:invert transition-all" />
            </div>

            {/* 2. Order Details (Items & Customer) */}
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Items</p>
                <p className="text-lg font-bold text-gray-900 leading-tight">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} <span className="text-[#ff5a00]">x{item.quantity}</span>
                      {i !== order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Customer</p>
                  <p className="text-sm font-bold text-gray-700">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">{order.address.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Delivery Address</p>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    {order.address.street}, {order.address.city},<br />
                    {order.address.state}, {order.address.zipcode}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Summary & Action Controls */}
            <div className="w-full xl:w-auto flex flex-row xl:flex-col sm:items-center xl:items-end justify-between gap-4 pt-6 xl:pt-0 border-t xl:border-t-0 border-gray-100">
              
              <div className="text-left xl:text-right">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Revenue</p>
                <p className="text-2xl font-black text-gray-900">₹{order.amount}.00</p>
                <p className="text-[10px] font-bold text-gray-400 mt-1">Items: {order.items.length}</p>
              </div>

              <div className="relative min-w-45">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 xl:text-right">Update Status</p>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className={`w-full pl-5 pr-10 py-3 rounded-xl font-bold text-sm cursor-pointer appearance-none outline-none border transition-all ${
                    order.status === "Delivered" 
                    ? "bg-green-50 border-green-100 text-green-600 focus:ring-4 focus:ring-green-500/10" 
                    : "bg-orange-50 border-orange-100 text-[#ff5a00] focus:ring-4 focus:ring-orange-500/10"
                  }`}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                {/* Custom Chevron for select */}
                <div className="absolute right-4 bottom-3.5 pointer-events-none opacity-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="bg-white rounded-[2.5rem] py-20 border border-dashed border-gray-200 text-center">
            <p className="text-gray-400 font-bold">Waiting for new orders...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
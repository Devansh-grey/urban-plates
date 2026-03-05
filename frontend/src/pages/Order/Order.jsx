import React, { useContext, useEffect, useState, useCallback } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
import axios from "axios";

const Order = () => {
  const { token, url } = useContext(StoreContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const statusColors = {
  "Food preparing": "bg-yellow-400",
  "Out for delivery": "bg-blue-400",
  "Delivered": "bg-green-500"
};

  const getOrders = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(`${url}/api/order/myorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        const sortedOrders = [...data.data].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setOrders(sortedOrders);

      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [token, url]);

 useEffect(() => {
  getOrders();

  const interval = setInterval(() => {
    getOrders();
  }, 5000); // refresh every 5 seconds

  return () => clearInterval(interval);
}, [getOrders]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#ff5a00]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          My Orders
        </h2>
        <div className="w-16 h-1.5 bg-[#ff5a00] rounded-full mt-2"></div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 py-20 text-center flex flex-col items-center gap-4">
          <img
            src={assets.bag_icon}
            alt="Empty Bag"
            className="w-20 opacity-20 mb-4"
          />
          <p className="text-2xl text-gray-900 font-bold">No orders yet</p>
          <p className="text-gray-500 font-medium max-w-sm">
            Looks like you haven't made your first order yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => {
            const itemsString = order.items
              .map((item) => `${item.name} x ${item.quantity}`)
              .join(", ");

            return (
              <div
                key={order._id}
                className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 md:p-8 bg-white rounded-4xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.12)] transition-all duration-300 border border-gray-50"
              >
                {/* Left */}
                <div className="flex items-center gap-6 flex-1 w-full">
                  <div className="w-16 h-16 shrink-0 bg-orange-50 rounded-2xl flex items-center justify-center border border-orange-100">
                    <img
                      src={assets.parcel_icon}
                      alt="Parcel"
                      className="w-8 opacity-80"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-lg font-bold text-gray-900 line-clamp-2">
                      {itemsString}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <p className="font-bold text-gray-400">
                        Order{" "}
                        <span className="text-gray-600">
                          #{order._id.slice(-6).toUpperCase()}
                        </span>
                      </p>

                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>

                      <p className="font-medium text-gray-400">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-10 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                  <div className="text-left sm:text-right">
                    <p className="text-2xl font-black text-[#ff5a00]">
                      ₹{order.amount}
                    </p>
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      Items: {order.items.length}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                    <span className={`h-2.5 w-2.5 rounded-full ${statusColors[order.status]}`}></span>
                    <p className="font-bold text-gray-700 text-sm">
                      {order.status}
                    </p>
                  </div>

                  <button
                    onClick={getOrders}
                    className="px-6 py-3 bg-orange-50 text-[#ff5a00] font-bold rounded-xl hover:bg-[#ff5a00] hover:text-white transition-all active:scale-95"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Order;
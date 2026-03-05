import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin", exact:true }, 
    { name: "Add Food", path: "/admin/add",  },
    { name: "Food List", path: "/admin/list",  },
    { name: "Orders", path: "/admin/orders",  },
    { name: "Users", path: "/admin/users",  },
  ];

  return (
    <div className="w-[18%] border-r border-gray-100 bg-white p-6 flex flex-col gap-8 top-20.25">
      
      <div className="px-4">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Menu</h3>
      </div>

      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => 
              `flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
                isActive 
                ? "bg-[#ff5a00]/5 text-[#ff5a00] shadow-[0_4px_12px_rgba(255,90,0,0.1)]" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <p className="text-sm tracking-wide">{item.name}</p>
          </NavLink>
        ))}
      </div>

      {/* Admin Quick Support Box */}
      <div className="mt-auto p-5 bg-[#fffaf5] rounded-4xl border border-orange-100">
          <p className="text-xs font-bold text-gray-900 mb-2">Need help?</p>
          <p className="text-[10px] text-gray-500 leading-relaxed mb-4">Contact tech support for dashboard issues.</p>
          <button className="w-full py-2 bg-white border border-orange-200 text-[#ff5a00] text-[10px] font-black uppercase rounded-xl hover:bg-[#ff5a00] hover:text-white transition-all">
              Support
          </button>
      </div>
    </div>
  );
};

export default Sidebar;
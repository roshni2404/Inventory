import React from 'react';
import { FaBox, FaCog, FaHome, FaShoppingCart, FaSignOutAlt, FaTable, FaTruck, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const menuItems = [
        { name: "Dashboard", path: "/admin-dashboard", icon: <FaHome />, exact: true },
        { name: "Categories", path: "/admin-dashboard/categories", icon: <FaTable /> },
        { name: "Products", path: "/admin-dashboard/products", icon: <FaBox /> },
        { name: "Suppliers", path: "/admin-dashboard/suppliers", icon: <FaTruck /> },
        { name: "Orders", path: "/admin-dashboard/orders", icon: <FaShoppingCart /> },
        { name: "Users", path: "/admin-dashboard/users", icon: <FaUsers /> },
        { name: "Profile", path: "/admin-dashboard/profile", icon: <FaCog /> },
        { name: "Logout", path: "/admin-dashboard/logout", icon: <FaSignOutAlt /> },
    ];

    return (
        <div className="flex flex-col h-screen bg-black text-white w-16 md:w-64 fixed">
            {/* Logo */}
            <div className="h-16 flex items-center justify-center font-bold text-xl border-b border-gray-700">
                <span className="hidden md:block">Inventory MS</span>
                <span className="md:hidden">IMS</span>
            </div>

            {/* Menu Items */}
            <div className="flex-1">
                <ul className="space-y-2 p-2">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                end={item.exact}   // ✅ sirf exact path match hone par active
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 p-2 rounded-md transition duration-200
                  ${isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-800"}`
                                }
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="hidden md:block">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;

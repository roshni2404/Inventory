// import React, { useState, useEffect } from "react";
// import { FaBox, FaCog, FaHome, FaShoppingCart, FaSignOutAlt, FaTable, FaTruck, FaUsers } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Sidebar = () => {

//     // Admin menu
//     const menuItems = [
//         { name: "Dashboard", path: "/admin-dashboard", icon: <FaHome />  },
//         { name: "Categories", path: "/admin-dashboard/categories", icon: <FaTable /> },
//         { name: "Products", path: "/admin-dashboard/products", icon: <FaBox /> },
//         { name: "Suppliers", path: "/admin-dashboard/suppliers", icon: <FaTruck /> },
//         { name: "Orders", path: "/admin-dashboard/orders", icon: <FaShoppingCart /> },
//         { name: "Users", path: "/admin-dashboard/users", icon: <FaUsers /> },
//         { name: "Profile", path: "/admin-dashboard/profile", icon: <FaCog /> },
//         { name: "Logout", path: "/admin-dashboard/logout", icon: <FaSignOutAlt /> },
//     ];

//     // Customer menu
//     const customerItems = [
//         { name: "Products", path: "/customer-dashboard", icon: <FaBox />, isParent: true },
//         { name: "Orders", path: "/customer-dashboard/orders", icon: <FaShoppingCart />, isParent: false },
//         { name: "Profile", path: "/customer-dashboard/profile", icon: <FaCog />, isParent: false },
//         { name: "Logout", path: "/customer-dashboard/logout", icon: <FaSignOutAlt />, isParent: false },
//     ];

//     const { user } = useAuth();
//     const [menuLinks, setMenuLinks] = useState(customerItems);

//     useEffect(() => {
     
//     if (user && user.role === "admin") {
//         setMenuLinks(menuItems);
//     }
// }, [])

//     return (
//         <div className="flex flex-col h-screen bg-black text-white w-16 md:w-64 fixed">
//             {/* Logo */}
//             <div className="h-16 flex items-center justify-center font-bold text-xl border-b border-gray-700">
//                 <span className="hidden md:block">Inventory MS</span>
//                 <span className="md:hidden">IMS</span>
//             </div>

//             {/* Menu Items */}
//             <div className="flex-1">
//                 <ul className="space-y-2 p-2">
//                     {menuLinks.map((item) => (
//                         <li key={item.name}>
//                             <NavLink
//                                 to={item.path}
//                                 end={item.exact}
//                                 className={({ isActive }) =>
//                                     `flex items-center space-x-3 p-2 rounded-md transition duration-200
//                   ${isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-800"}`
//                                 }
//                             >
//                                 <span className="text-xl">{item.icon}</span>
//                                 <span className="hidden md:block">{item.name}</span>
//                             </NavLink>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;












import React, { useState, useEffect } from "react";
import {
    FaBox,
    FaCog,
    FaHome,
    FaShoppingCart,
    FaSignOutAlt,
    FaTable,
    FaTruck,
    FaUsers,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
    // Admin menu
    const menuItems = [
        { name: "Dashboard", path: "/admin-dashboard", icon: <FaHome /> },
        { name: "Categories", path: "/admin-dashboard/categories", icon: <FaTable /> },
        { name: "Products", path: "/admin-dashboard/products", icon: <FaBox /> },
        { name: "Suppliers", path: "/admin-dashboard/suppliers", icon: <FaTruck /> },
        { name: "Orders", path: "/admin-dashboard/orders", icon: <FaShoppingCart /> },
        { name: "Users", path: "/admin-dashboard/users", icon: <FaUsers /> },
        { name: "Profile", path: "/admin-dashboard/profile", icon: <FaCog /> },
        { name: "Logout", path: "/admin-dashboard/logout", icon: <FaSignOutAlt /> },
    ];

    // Customer menu
    const customerItems = [
        { name: "Products", path: "/customer-dashboard", icon: <FaBox /> },
        { name: "Orders", path: "/customer-dashboard/orders", icon: <FaShoppingCart /> },
        { name: "Profile", path: "/customer-dashboard/profile", icon: <FaCog /> },
        { name: "Logout", path: "/customer-dashboard/logout", icon: <FaSignOutAlt /> },
    ];

    const { user } = useAuth();
    const [menuLinks, setMenuLinks] = useState(customerItems);

    useEffect(() => {
        if (user && user.role === "admin") {
            setMenuLinks(menuItems);
        }
    }, [user]);

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
                    {menuLinks.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                // ✅ Dashboard & Customer Products exact match only
                                end={item.name === "Dashboard" || item.name === "Products"}
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

import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    // ✅ Get token from localStorage
    const token = localStorage.getItem("pos-token");

    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/orders", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.success) {
                setOrders(res.data.orders || []); // backend must return orders array
            } else {
                console.error("Error fetching orders:", res.data.message);
                alert("Error fetching orders. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="w-full h-full flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Orders</h1>

            <div>
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">S NO</th>
                            <th className="border border-gray-300 p-2">Product Name</th>
                            <th className="border border-gray-300 p-2">Category Name</th>
                            <th className="border border-gray-300 p-2">Quantity</th>
                            <th className="border border-gray-300 p-2">Total Price</th>
                            <th className="border border-gray-300 p-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={order._id}>
                                    <td className="border border-gray-300 p-2">{index + 1}</td>
                                    <td className="border border-gray-300 p-2">{order.product?.name}</td>
                                    <td className="border border-gray-300 p-2">
                                        {order.product?.categoryId?.categoryName}
                                    </td>
                                    <td className="border border-gray-300 p-2">{order.quantity}</td>
                                    <td className="border border-gray-300 p-2">{order.totalPrice}</td>
                                    <td className="border border-gray-300 p-2">
                                        {new Date(order.orderDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4">No records</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;










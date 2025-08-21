import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerProducts = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [orderData, setOrderData] = useState({
        productId: "",
        quantity: 1,
        total: 0,
        stock: 0,
        price: 0,
    });

    const token = localStorage.getItem("pos-token");
    const user = JSON.parse(localStorage.getItem("pos-user")); // logged-in customer

    // 🔹 Fetch Products (Customer Public Route)
    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/products/public");

            if (res.data.success) {
                setCategories(res.data.categories || []);
                setProducts(res.data.products || []);
                setFilteredProducts(res.data.products || []);
            } else {
                alert("Error fetching products. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // 🔹 Search by product name
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setFilteredProducts(
            products.filter((product) =>
                product.name.toLowerCase().includes(query)
            )
        );
    };

    // 🔹 Filter by category
    const handleChangeCategory = (e) => {
        const categoryId = e.target.value;
        if (!categoryId) {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter((product) => product.categoryId?._id === categoryId)
            );
        }
    };

    // 🔹 When user clicks "Order"
    const handleOrderChange = (product) => {
        setOrderData({
            productId: product._id,
            quantity: 1,
            total: product.price,
            stock: product.stock,
            price: product.price,
        });
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    // 🔹 Order Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:3000/api/orders/add",
                {
                    ...orderData,
                    userId: user?._id,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data.success) {
                alert("Order placed successfully ✅");
                setOpenModal(false);
                setOrderData({
                    productId: "",
                    quantity: 1,
                    stock: 0,
                    total: 0,
                    price: 0,
                });
                fetchProducts(); // refresh stock after order
            } else {
                alert(res.data.message || "Error placing order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Error: " + error.message);
        }
    };

    // 🔹 Handle Quantity Change
    const handleQuantityChange = (e) => {
        let value = parseInt(e.target.value) || 1;
        if (value < 1) value = 1;
        if (value > orderData.stock) {
            alert("Not enough stock available");
            value = orderData.stock;
        }
        setOrderData((prev) => ({
            ...prev,
            quantity: value,
            total: value * prev.price,
        }));
    };

    return (
        <div>
            <div className="py-4 px-4">
                <h2 className="font-bold text-xl">Products</h2>
            </div>

            <div className="py-4 px-6 flex justify-between items-center">
                {/* Category Filter */}
                <div>
                    <select
                        name="category"
                        className="bg-white border p-2 rounded"
                        onChange={handleChangeCategory}
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Search Bar */}
                <div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="border p-1 bg-white rounded px-4"
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Products Table */}
            <div>
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">S No</th>
                            <th className="border border-gray-300 p-2">Product Name</th>
                            <th className="border border-gray-300 p-2">Category Name</th>
                            <th className="border border-gray-300 p-2">Price</th>
                            <th className="border border-gray-300 p-2">Stock</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <tr key={product._id}>
                                    <td className="border border-gray-300 p-2">{index + 1}</td>
                                    <td className="border border-gray-300 p-2">{product.name}</td>
                                    <td className="border border-gray-300 p-2">
                                        {product.categoryId?.categoryName}
                                    </td>
                                    <td className="border border-gray-300 p-2">₹{product.price}</td>
                                    <td className="border border-gray-300 p-2">
                                        {product.stock === 0 ? (
                                            <span className="bg-red-100 text-red-500 px-2 py-1 rounded-full">
                                                {product.stock}
                                            </span>
                                        ) : product.stock < 5 ? (
                                            <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
                                                {product.stock}
                                            </span>
                                        ) : (
                                            <span className="bg-green-100 text-green-500 px-2 py-1 rounded-full">
                                                {product.stock}
                                            </span>
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <button
                                            onClick={() => handleOrderChange(product)}
                                            className="px-2 py-1 bg-green-500 hover:bg-green-700 text-white rounded mr-2"
                                            disabled={product.stock === 0}
                                        >
                                            Order
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4">
                                    No records
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Order Modal */}
            {openModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-20">
                    <div className="bg-white p-6 rounded shadow-md w-1/3 relative">
                        <h1 className="text-xl font-bold">Place Order</h1>
                        <button
                            className="absolute top-4 right-4 font-bold text-lg"
                            onClick={closeModal}
                        >
                            X
                        </button>

                        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Enter Quantity"
                                className="border p-1 bg-white rounded px-4"
                                value={orderData.quantity}
                                onChange={handleQuantityChange}
                                min="1"
                                max={orderData.stock}
                            />

                            <p>Total: ₹{orderData.total}</p>

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-green-500 text-white p-3 hover:bg-green-600"
                                >
                                    Save Order
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="w-full rounded-md bg-red-500 text-white p-3 hover:bg-red-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerProducts;

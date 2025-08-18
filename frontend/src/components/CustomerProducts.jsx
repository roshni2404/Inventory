// import React, { useState, useEffect } from 'react'
// import axios from 'axios';

// const CustomerProducts = () => {

//      const [categories, setCategories] = useState([]);
//      const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [openModal, setOpenModal] = useState(false);
//     const [orderData, setOrderData] = useState({
//         productId: "",
//         quantity: 1,
//         total: 0,
//         stock: 0,
//         price: 0
//     })


//     const fetchProducts = async () => {
//         try {
//             const res = await axios.get("http://localhost:3000/api/products", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             if (res.data.success) {
//                 setCategories(res.data.categories || []);
//                 setProducts(res.data.products || []);
//                 setFilteredProducts(res.data.products || []);
//             } else {
//                 console.error("Error fetching products:", res.data.message);
//                 alert("Error fetching products. Please try again.")
//             }

//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const handleSearch = (e) => {
//         setFilteredProducts(
//             products.filter((product) =>
//             product.name.toLowerCase().includes(e.target.value.toLowerCase()))
//         )
//     }

//     const handleChangeCategory = (e) => {
//         setFilteredProducts(
//             products.filter((product) => product.category._id === e.target.value)
//         )
//     }

//     const handleOrderChange = (product) => {
//         setOrderData({
//             productId: product.id,
//             quantity: 1,
//             total: product.price,
//             stock: product.stock,
//             price: product.price

//         })
//         setOpenModal(true);

//     }

//     const closeModal = () => {
//         setOpenModal(false);

//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("https://localhost:3000/api/orders/add", orderData , {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             if (res.data.success) {
//                 setOpenModal(false);
//                 setOrderData({
//                     productId: "", quantity: 1, stock: 0, total: 0, price: 0

//                 });
//                 alert("order added successfully");


//             }
//         } catch(error) {
//             console.log(error);
//             alert("Error"+ error);

//         }

//     }

//     const increaseQuantity = (e) => {
//         if(e.target.value > orderData.stock) {
//             alert("Not enough stock");
//         } else {
//             setOrderData((prev) => ({
//                 ...prev,
//                 quantity: parseInt(e.target.value),
//                 total: parseInt(e.target.value) * parseInt(orderData.price)
//             }))
//         }

//     }


//     return (
//         <div>
//             <div className='py-4 px-b'>
//                 <h2 className='font-bold text-xl'>Products</h2>
//             </div>
//             <div className='py-4 px-2 flex justify-between items-center'>
//                 <div>
//                    <select name='category' id="" className='bg-white border p-1 rounded' onChange={handleChangeCategory}>
//                     <option value="">Select Category</option>
//                     {categories.map((cat, index) => (
//                         <option value={cat.id}>{cat.name}</option>
//                     ))}

//                    </select>
//                 </div>
//                 <div>
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         className="border p-1 bg-white rounded px-4"
//                         onChange={handleSearch}
//                     />
//                 </div>
//             </div>

//             <div>

//                 <table className="w-full border-collapse border border-gray-300 mt-4">
//                     <thead>
//                         <tr className="bg-gray-200">
//                             <th className="border border-gray-300 p-2">S NO</th>
//                             <th className="border border-gray-300 p-2">Product Name</th>
//                             <th className="border border-gray-300 p-2">Category Name</th>
//                             <th className="border border-gray-300 p-2">Price</th>
//                             <th className="border border-gray-300 p-2">Stock</th>
//                             <th className="border border-gray-300 p-2">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredProducts.length > 0 ? (
//                             filteredProducts.map((product, index) => (
//                                 <tr key={product._id}>
//                                     <td className="border border-gray-300 p-2">{index + 1}</td>
//                                     <td className="border border-gray-300 p-2">{product.name}</td>
//                                     <td className="border border-gray-300 p-2">
//                                         {product.category.categoryName}
//                                     </td>

//                                     <td className="border border-gray-300 p-2">{product.price}</td>
//                                     <td className="border border-gray-300 p-2">
//                                         {product.stock === 0 ? (
//                                             <span className="bg-red-100 text-red-500 px-2 py-1 rounded-full">
//                                                 {product.stock}
//                                             </span>
//                                         ) : product.stock < 5 ? (
//                                             <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
//                                                 {product.stock}
//                                             </span>
//                                         ) : (
//                                             <span className="bg-green-100 text-green-500 px-2 py-1 rounded-full">
//                                                 {product.stock}
//                                             </span>
//                                         )}
//                                     </td>
//                                     <td className="border border-gray-300 p-2">
//                                         <button onClick={() => handleOrderChange(product)} 
//                                             className="px-2 py-1 bg-green-500 hover:bg-green-700 text-white rounded mr-2"
//                                         >
//                                             Order
//                                         </button>

//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="7" className="text-center p-4">
//                                     No records 
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>


//             {openModal && (
//                 <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-20">
//                     <div className="bg-white p-6 rounded shadow-md w-1/3 relative">
//                         <h1 className="text-xl font-bold">Place Order</h1>
//                         <button
//                             className="absolute top-4 right-4 font-bold text-lg"
//                             onClick={closeModal}
//                         >
//                             X
//                         </button>

//                         <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
//                             <input
//                                 type="number"
//                                 name="quantity"
//                                 placeholder="Increase Quantity"
//                                 className="border p-1 bg-white rounded px-4"
//                                 value={orderData.quantity}
//                                 onChange={increaseQuantity}
//                                 min="1"

//                             />

//                             <p>{orderData.quantity * orderData.price}</p>


//                             <div className="flex gap-2">
//                                 <button
//                                     type="submit"
//                                     className="w-full rounded-md bg-green-500 text-white p-3 hover:bg-green-600"
//                                 >
//                                      Save Changes 
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={closeModal}
//                                     className="w-full rounded-md bg-red-500 text-white p-3 hover:bg-red-600"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default CustomerProducts;







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

    // ✅ token localStorage से ले रहे हैं
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")); // logged in customer

    // 🔹 Products लाना
    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/products", {
                headers: { Authorization: `Bearer ${token}` },
            });

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
        setFilteredProducts(
            products.filter((product) =>
                product.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    // 🔹 Filter by category
    const handleChangeCategory = (e) => {
        if (!e.target.value) {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter((product) => product.category._id === e.target.value)
            );
        }
    };

    // 🔹 जब user "Order" पर क्लिक करे
    const handleOrderChange = (product) => {
        setOrderData({
            productId: product._id, // ✅ सही id भेजना
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

    // 🔹 Order Submit करना
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:3000/api/orders/add",
                {
                    ...orderData,
                    userId: user?._id, // ✅ किसने order किया
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
            } else {
                alert(res.data.message || "Error placing order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Error: " + error.message);
        }
    };

    // 🔹 Quantity बढ़ाना/घटाना
    const increaseQuantity = (e) => {
        const value = parseInt(e.target.value);
        if (value > orderData.stock) {
            alert("Not enough stock");
        } else {
            setOrderData((prev) => ({
                ...prev,
                quantity: value,
                total: value * prev.price,
            }));
        }
    };

    return (
        <div>
            <div className="py-4 px-4">
                <h2 className="font-bold text-xl">Products</h2>
            </div>

            <div className="py-4 px-2 flex justify-between items-center">
                <div>
                    <select
                        name="category"
                        className="bg-white border p-1 rounded"
                        onChange={handleChangeCategory}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
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
                                        {product.category?.name}
                                    </td>
                                    <td className="border border-gray-300 p-2">{product.price}</td>
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
                                        >
                                            Order
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center p-4">
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
                                placeholder="Increase Quantity"
                                className="border p-1 bg-white rounded px-4"
                                value={orderData.quantity}
                                onChange={increaseQuantity}
                                min="1"
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

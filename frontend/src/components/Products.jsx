import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
    const [openModal, setOpenModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]); // ✅ products ka state
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        supplier: "",
    });

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/category", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                },
            });
            if (res.data.success) { // ✅ 'response' → 'res'
                setCategories(res.data.categories || []);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
        }
    };

    // Fetch suppliers
    const fetchSuppliers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/supplier", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                },
            });
            if (res.data.success) { // ✅ 'response' → 'res'
                setSuppliers(res.data.suppliers || []);
            }
        } catch (error) {
            console.error("Error fetching suppliers:", error);
            setSuppliers([]);
        }
    };

    // Fetch products
    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/products", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                },
            });
            if (res.data.success) {
                setProducts(res.data.products || []);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchSuppliers();
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Backend schema ke field names ke according payload
            const payload = {
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                stock: Number(formData.stock),
                categoryId: formData.category, // ✅ backend ke field ka naam
                supplierId: formData.supplier, // ✅ backend ke field ka naam
            };

            const res = await axios.post(
                "http://localhost:3000/api/products/add",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                }
            );

            if (res.data.success) {
                alert("Product added successfully!");
                setOpenModal(false);
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    stock: "",
                    category: "",
                    supplier: "",
                });
                fetchProducts(); // ✅ product list refresh
            } else {
                alert("Error adding product. Please try again.");
            }
        } catch (error) {
            console.error("Add Product Error:", error);
            alert("Error adding product. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(
                `http://localhost:3000/api/products/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                }
            );
            if (res.data.success) {
                alert("Product deleted successfully!");
                fetchProducts();
            }
        } catch (error) {
            console.error("Delete Product Error:", error);
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Product Management</h1>

            <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search"
                    className="border p-1 bg-white rounded px-4"
                />
                <button
                    className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer"
                    onClick={() => setOpenModal(true)}
                >
                    Add Product
                </button>
            </div>

            <div>
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">S NO</th>
                            <th className="border border-gray-300 p-2">Product Name</th>
                            <th className="border border-gray-300 p-2">Category Name</th>
                            <th className="border border-gray-300 p-2">Supplier Name</th>
                            <th className="border border-gray-300 p-2">Price</th>
                            <th className="border border-gray-300 p-2">Stock</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id}>
                                <td className="border border-gray-300 p-2">{index + 1}</td>
                                <td className="border border-gray-300 p-2">{product.name}</td>
                                <td className="border border-gray-300 p-2">{product.categoryId?.categoryName}</td>
                                <td className="border border-gray-300 p-2">{product.supplierId?.name}</td>
                                <td className="border border-gray-300 p-2">{product.price}</td>
                                <td className="border border-gray-300 p-2">
                                    <span className="rounded-full font-semibold">
                                        {product.stock === 0 ? (
                                            <span className="bg-red-100 text-red-500">{product.stock}</span>
                                        ) : product.stock < 5 ? (
                                            <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">{product.stock}</span>
                                        ) : (
                                            <span className="bg-green-100 text-green-500 px-2 py-1 rounded-full">{product.stock}</span>
                                        )}
                                    </span>


                                </td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        className="px-2 py-1 bg-yellow-500 text-white rounded cursor-pointer mr-2"
                                        onClick={() => handleEdit(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
                                        onClick={() => handleDelete(product._id)} // ✅ supplier._id → product._id
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {openModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-md w-1/3 relative">
                        <h1 className="text-xl font-bold">Add Product</h1>
                        <button
                            className="absolute top-4 right-4 font-bold text-lg cursor-pointer"
                            onClick={() => setOpenModal(false)}
                        >
                            X
                        </button>

                        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                className="border p-1 bg-white rounded px-4"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                className="border p-1 bg-white rounded px-4"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Enter Price"
                                className="border p-1 bg-white rounded px-4"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="stock"
                                placeholder="Enter Stock"
                                className="border p-1 bg-white rounded px-4"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                            />

                            {/* Category Dropdown */}
                            <div className="w-full border">
                                <select
                                    name="category"
                                    className="w-full p-2"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Supplier Dropdown */}
                            <div className="w-full border">
                                <select
                                    name="supplier"
                                    className="w-full p-2"
                                    value={formData.supplier}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Supplier</option>
                                    {suppliers.map((supplier) => (
                                        <option key={supplier._id} value={supplier._id}>
                                            {supplier.name || supplier.supplierName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600"
                                >
                                    Add Product
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpenModal(false)}
                                    className="w-full rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
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

export default Products;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
    const [openModal, setOpenModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        supplierId: "",
    });

    const token = localStorage.getItem("pos-token");

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/category", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.success) {
                setCategories(res.data.categories || []);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Fetch suppliers
    const fetchSuppliers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/supplier", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.success) {
                setSuppliers(res.data.suppliers || []);
            }
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    };

    // Fetch products
    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/products", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.success) {
                setProducts(res.data.products || []);
                setFilteredProducts(res.data.products || []);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchSuppliers();
        fetchProducts();
    }, []);

    // Input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Open modal in edit mode
    const handleEdit = (product) => {
        setOpenModal(true);
        setEditProduct(product._id);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            categoryId: product.categoryId?._id || "",
            supplierId: product.supplierId?._id || "",
        });
    };

    // Close modal
    const closeModal = () => {
        setOpenModal(false);
        setEditProduct(null);
        setFormData({
            name: "",
            description: "",
            price: "",
            stock: "",
            categoryId: "",
            supplierId: "",
        });
    };

    // Add or Update product
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editProduct) {
                const res = await axios.put(
                    `http://localhost:3000/api/products/${editProduct}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (res.data.success) {
                    alert("Product updated successfully!");
                    fetchProducts();
                    closeModal();
                } else {
                    alert("Error updating product.");
                }
            } else {
                const payload = {
                    ...formData,
                    price: Number(formData.price),
                    stock: Number(formData.stock),
                };
                const res = await axios.post(
                    "http://localhost:3000/api/products/add",
                    payload,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (res.data.success) {
                    alert("Product added successfully!");
                    fetchProducts();
                    closeModal();
                } else {
                    alert("Error adding product.");
                }
            }
        } catch (error) {
            console.error("Product save error:", error);
            alert("An error occurred.");
        }
    };

    // Delete product
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Product?")) {
            try {
                const res = await axios.delete(
                    `http://localhost:3000/api/products/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (res.data.success) {
                    alert("Product deleted successfully!");
                    fetchProducts();
                } else {
                    alert("Error deleting product.");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    // Search products
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (!searchTerm) {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter((product) =>
                    product.name.toLowerCase().includes(searchTerm)
                )
            );
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
                    onChange={handleSearch}
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
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <tr key={product._id}>
                                <td className="border border-gray-300 p-2">{index + 1}</td>
                                <td className="border border-gray-300 p-2">{product.name}</td>
                                <td className="border border-gray-300 p-2">
                                    {product.categoryId?.categoryName}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {product.supplierId?.name}
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
                                        className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                                        onClick={() => handleEdit(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-2 py-1 bg-red-500 text-white rounded"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center p-4">
                                No records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

            {openModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-md w-1/3 relative">
                        <h1 className="text-xl font-bold">
                            {editProduct ? "Edit Product" : "Add Product"}
                        </h1>
                        <button
                            className="absolute top-4 right-4 font-bold text-lg"
                            onClick={closeModal}
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
                                min="0"
                                placeholder="Enter Stock"
                                className="border p-1 bg-white rounded px-4"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                            />

                            <select
                                name="categoryId"
                                className="border p-2"
                                value={formData.categoryId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </select>

                            <select
                                name="supplierId"
                                className="border p-2"
                                value={formData.supplierId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Supplier</option>
                                {suppliers.map((sup) => (
                                    <option key={sup._id} value={sup._id}>
                                        {sup.name || sup.supplierName}
                                    </option>
                                ))}
                            </select>

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-green-500 text-white p-3 hover:bg-green-600"
                                >
                                    {editProduct ? "Save Changes" : "Add Product"}
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

export default Products;








import React, { useState, useEffect } from 'react'
import axios from "axios";

const Suppliers = () => {
    const [addEditModel, setAddEditModel] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        address: "",
    });
    const [loading, setLoading] = useState(false);
    const [suppliers, setSuppliers] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fetchSuppliers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/supplier", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                },
            });
            setSuppliers(response.data.suppliers || []);
        } catch (error) {
            console.error("Error fetching suppliers:", error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3000/api/supplier/add",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                }
            );

            if (response.data.success) {
                alert("Supplier added successfully!");
                setAddEditModel(null);
                setFormData({
                    name: "",
                    email: "",
                    number: "",
                    address: "",
                });
                fetchSuppliers();
            } else {
                alert("Error adding supplier. Please try again.");
            }
        } catch (error) {
            alert("Error adding supplier. Please try again");
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Supplier Management</h1>

            {/* Top Section */}
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search"
                    className="border p-1 bg-white rounded px-4"
                />
                <button
                    className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer"
                    onClick={() => setAddEditModel(1)}
                >
                    Add Supplier
                </button>
            </div>

            {loading ? (
                <div>Loading ....</div>
            ) : (
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Supplier Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Phone Number</th>
                            <th className="border border-gray-300 p-2">Address</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((supplier) => (
                            <tr key={supplier._id}>
                                <td className="border border-gray-300 p-2">{supplier.name}</td>
                                <td className="border border-gray-300 p-2">{supplier.email}</td>
                                <td className="border border-gray-300 p-2">{supplier.number}</td>
                                <td className="border border-gray-300 p-2">{supplier.address}</td>
                                <td className="border border-gray-300 p-2">
                                    <button className="px-2 py-1 bg-yellow-500 text-white rounded cursor-pointer mr-2">
                                        Edit
                                    </button>
                                    <button className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Add Supplier Modal */}
            {addEditModel && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-md w-1/3 relative">
                        <h1 className="text-xl font-bold">Add Supplier</h1>

                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 font-bold text-lg cursor-pointer"
                            onClick={() => setAddEditModel(null)}
                        >
                            X
                        </button>

                        {/* Form */}
                        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Supplier Name"
                                className="border p-1 bg-white rounded px-4"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Supplier Email"
                                className="border p-1 bg-white rounded px-4"
                            />
                            <input
                                type="number"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                placeholder="Supplier Phone Number"
                                className="border p-1 bg-white rounded px-4"
                            />
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Supplier Address"
                                className="border p-1 bg-white rounded px-4"
                            />
                            <button
                                type="submit"
                                className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer"
                            >
                                Add Supplier
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Suppliers

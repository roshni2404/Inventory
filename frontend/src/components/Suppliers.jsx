import React, { useState } from 'react'
import axios from "axios";

const Suppliers = () => {
    const [addEditModel, setAddEditModel] = useState(null);
    cont[SupplierName, setSupplierName] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preentDefault();
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



            } else {
                console.error("Error adding supplier:", data);
                alert("Error adding supplier. Please try again.");
            }
        } catch (error) {
            console.error("Error adding supplier:", error);
            alert("Error adding supplier. Please try again");
        }
    }








    return (
        <div className='w-full h-full flex flex-col gap-4 p-4'>
            <h1 className='text-2xl font-bold'>Supplier Management</h1>

            {/* Top Section */}
            <div className='flex justify-between items-center'>
                <input
                    type='text'
                    placeholder='Search'
                    className='border p-1 bg-white rounded px-4'
                />
                <button
                    className='px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer'
                    onClick={() => setAddEditModel(1)}
                >
                    Add Supplier
                </button>
            </div>

            {/* Add Supplier Modal */}
            {addEditModel && (
                <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
                    <div className='bg-white p-6 rounded shadow-md w-1/3 relative'>
                        <h1 className='text-xl font-bold'>Add Supplier</h1>

                        {/* Close Button */}
                        <button
                            className='absolute top-4 right-4 font-bold text-lg cursor-pointer'
                            onClick={() => setAddEditModel(null)}
                        >
                            X
                        </button>

                        {/* Form */}
                        <form className='flex flex-col gap-4 mt-4' onSubmit={handleSubmit}>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Supplier Name'
                                className='border p-1 bg-white rounded px-4'
                            />
                            <input
                                type='email'
                                name='email'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Supplier Email'
                                className='border p-1 bg-white rounded px-4'
                            />
                            <input
                                type='number'
                                name='number'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Supplier Phone Number'
                                className='border p-1 bg-white rounded px-4'
                            />
                            <input
                                type='text'
                                name='text'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Supplier Address'
                                className='border p-1 bg-white rounded px-4'
                            />
                            <button type='submit' className='px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer'
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

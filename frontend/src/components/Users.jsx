import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "",
    });
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);  // ✅ fixed typo
    const [loading, setLoading] = useState(false);

    // Fetch Users
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                },
            });
            setUsers(response.data.users || []);
            setFilteredUsers(response.data.users || []); // ✅ initialize filtered list
        } catch (error) {
            console.error("Error fetching users:", error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setFilteredUsers(
            users.filter((user) =>
                user.name.toLowerCase().includes(keyword)
            )
        );
    };

    // Add User
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3000/api/users/add",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                }
            );

            if (response.data.success) {
                alert("User added successfully!");
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    address: "",
                    role: "",
                });
                fetchUsers(); // Refresh list
            } else {
                alert("Error adding user. Please try again.");
            }
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Error adding user. Please try again.");
        }
    };

    // Delete User
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(
                `http://localhost:3000/api/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                }
            );

            if (response.data.success) {
                alert("User deleted successfully!");
                setUsers(users.filter((u) => u._id !== id));
                setFilteredUsers(filteredUsers.filter((u) => u._id !== id));
            } else {
                alert("Error deleting user. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Error deleting user. Please try again.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    if (loading) return <div className="p-4">Loading ....</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-8">Users Management</h1>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Form Section */}
                <div className="lg:w-1/3">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-center text-xl font-bold mb-4">Add User</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    name="name"
                                    value={formData.name}
                                    className="border w-full p-2 rounded-md"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={formData.email}
                                    className="border w-full p-2 rounded-md"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    value={formData.password}
                                    className="border w-full p-2 rounded-md"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter Address"
                                    name="address"
                                    value={formData.address}
                                    className="border w-full p-2 rounded-md"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <select
                                    name="role"
                                    value={formData.role}
                                    className="border w-full p-2 rounded-md"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="customer">Customer</option>
                                </select>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600"
                                >
                                    Add User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Table Section */}
                <div className="lg:w-2/3">
                    <input
                        type="text"
                        placeholder="Search"
                        className="p-2 bg-white w-full mb-4 rounded"
                        onChange={handleSearch}
                    />

                    <div className="bg-white shadow-lg rounded-md p-6">
                        <table className="w-full border border-gray-200 text-center">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-200 p-2">S No</th>
                                    <th className="border border-gray-200 p-2">Name</th>
                                    <th className="border border-gray-200 p-2">Email</th>
                                    <th className="border border-gray-200 p-2">Address</th>
                                    <th className="border border-gray-200 p-2">Role</th>
                                    <th className="border border-gray-200 p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user, index) => (
                                        <tr key={user._id}>
                                            <td className="border border-gray-200 p-2">{index + 1}</td>
                                            <td className="border border-gray-200 p-2">{user.name}</td>
                                            <td className="border border-gray-200 p-2">{user.email}</td>
                                            <td className="border border-gray-200 p-2">{user.address}</td>
                                            <td className="border border-gray-200 p-2">{user.role}</td>
                                            <td className="border border-gray-200 p-2">
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="p-4 text-gray-500">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;


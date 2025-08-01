
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Categories = () => {
//     const [categoryName, setCategoryName] = useState("");
//     const [categoryDescription, setCategoryDescription] = useState("");
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [editCategory, setEditCategory] = useState(null);

//     // Fetch Categories
//     const fetchCategories = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get("http://localhost:3000/api/category", {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
//                 },
//             });
//             setCategories(response.data.categories);
//         } catch (error) {
//             console.error("Error fetching categories:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     // Add / Update Category
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (editCategory) {
//                 // Update
//                 const response = await axios.put(
//                     `http://localhost:3000/api/category/${editCategory}`,
//                     { categoryName, categoryDescription },
//                     {
//                         headers: {
//                             Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
//                         },
//                     }
//                 );

//                 if (response.data.success) {
//                     setEditCategory(null);
//                     setCategoryName("");
//                     setCategoryDescription("");
//                     alert("Category updated successfully!");
//                     fetchCategories();
//                 } else {
//                     console.error("Error editing category:", response.data);
//                     alert("Error editing category. Please try again.");
//                 }
//             } else {
//                 // Add
//                 const response = await axios.post(
//                     "http://localhost:3000/api/category/add",
//                     { categoryName, categoryDescription },
//                     {
//                         headers: {
//                             Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
//                         },
//                     }
//                 );

//                 if (response.data.success) {
//                     setCategoryName("");
//                     setCategoryDescription("");
//                     alert("Category added successfully!");
//                     fetchCategories();
//                 }
//             }
//         } catch (error) {
//             console.error("Error saving category:", error);
//             alert("Error saving category!");
//         }
//     };

//     // Delete Category
//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this category?");
//         if (confirmDelete) {
//             return;

//             try {
//                 const response = await axios.delete(
//                     `http://localhost:3000/api/category/${id}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
//                         },
//                     }
//                 );
//                 if (response.data.success) {
//                     alert("Category deleted successfully!");
//                     setCategories(categories.filter((cat) => cat._id !== id));
//                 }

//             } catch (error) {
//                 console.error("Error deleting category:", data);
//                 alert("Error deleting category. Please try again.");
//             }

//         };

//         // Edit Category
//         const handleEdit = (category) => {
//             setEditCategory(category._id);
//             setCategoryName(category.categoryName);
//             setCategoryDescription(category.categoryDescription);
//         };

//         // Cancel Edit
//         const handleCancel = () => {
//             setEditCategory(null);
//             setCategoryName("");
//             setCategoryDescription("");
//         };

//         if (loading) return <div className="p-4">Loading ....</div>;

//         return (
//             <div className="p-6">
//                 <h1 className="text-2xl font-bold mb-8">Category Management</h1>

//                 <div className="flex flex-col lg:flex-row gap-4">
//                     {/* Form Section */}
//                     <div className="lg:w-1/3">
//                         <div className="bg-white shadow-md rounded-lg p-4">
//                             <h2 className="text-center text-xl font-bold mb-4">
//                                 {editCategory ? "Edit Category" : "Add Category"}
//                             </h2>
//                             <form className="space-y-4" onSubmit={handleSubmit}>
//                                 <div>
//                                     <input
//                                         type="text"
//                                         value={categoryName}
//                                         placeholder="Category Name"
//                                         className="border w-full p-2 rounded-md"
//                                         onChange={(e) => setCategoryName(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <input
//                                         type="text"
//                                         value={categoryDescription}
//                                         placeholder="Category Description"
//                                         className="border w-full p-2 rounded-md"
//                                         onChange={(e) => setCategoryDescription(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="flex space-x-2">
//                                     <button
//                                         type="submit"
//                                         className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600"
//                                     >
//                                         {editCategory ? "Save Changes" : "Add Category"}
//                                     </button>
//                                     {editCategory && (
//                                         <button
//                                             type="button"
//                                             onClick={handleCancel}
//                                             className="w-full rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
//                                         >
//                                             Cancel
//                                         </button>
//                                     )}
//                                 </div>
//                             </form>
//                         </div>
//                     </div>

//                     {/* Table Section */}
//                     <div className="flex-1">
//                         <div className="bg-white shadow-lg rounded-md p-6">
//                             <table className="w-full border border-gray-200 text-center">
//                                 <thead className="bg-gray-100">
//                                     <tr>
//                                         <th className="border border-gray-200 p-2">S No</th>
//                                         <th className="border border-gray-200 p-2">Category Name</th>
//                                         <th className="border border-gray-200 p-2">Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {categories.map((category, index) => (
//                                         <tr key={category._id}>
//                                             <td className="border border-gray-200 p-2">{index + 1}</td>
//                                             <td className="border border-gray-200 p-2">
//                                                 {category.categoryName}
//                                             </td>
//                                             <td className="border border-gray-200 p-2">
//                                                 <div className="flex justify-center space-x-2">
//                                                     <button
//                                                         onClick={() => handleEdit(category)}
//                                                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                                                     >
//                                                         Edit
//                                                     </button>
//                                                     <button
//                                                         onClick={() => handleDelete(category._id)}
//                                                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClickCapture={() => handleEdit(category)}
//                                                     >
//                                                         Delete
//                                                     </button>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         );
//     };
// };

// export default Categories;








import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editCategory, setEditCategory] = useState(null);

    // Fetch Categories
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/category", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                },
            });
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Add / Update Category
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editCategory) {
                // Update
                const response = await axios.put(
                    `http://localhost:5000/api/category/${editCategory}`,
                    { categoryName, categoryDescription },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                        },
                    }
                );

                if (response.data.success) {
                    setEditCategory(null);
                    setCategoryName("");
                    setCategoryDescription("");
                    alert("Category updated successfully!");
                    fetchCategories();
                } else {
                    alert("Error editing category. Please try again.");
                }
            } else {
                // Add
                const response = await axios.post(
                    "http://localhost:5000/api/category/add",
                    { categoryName, categoryDescription },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                        },
                    }
                );

                if (response.data.success) {
                    setCategoryName("");
                    setCategoryDescription("");
                    alert("Category added successfully!");
                    fetchCategories();
                }
            }
        } catch (error) {
            console.error("Error saving category:", error);
            alert("Error saving category!");
        }
    };

    // Delete Category
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(
                `http://localhost:5000/api/category/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                }
            );
            if (response.data.success) {
                alert("Category deleted successfully!");
                setCategories(categories.filter((cat) => cat._id !== id));
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Error deleting category. Please try again.");
        }
    };

    // Edit Category
    const handleEdit = (category) => {
        setEditCategory(category._id);
        setCategoryName(category.categoryName);
        setCategoryDescription(category.categoryDescription);
    };

    // Cancel Edit
    const handleCancel = () => {
        setEditCategory(null);
        setCategoryName("");
        setCategoryDescription("");
    };

    if (loading) return <div className="p-4">Loading ....</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-8">Category Management</h1>

            <div className="flex flex-col lg:flex-row gap-4">
                {/* Form Section */}
                <div className="lg:w-1/3">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-center text-xl font-bold mb-4">
                            {editCategory ? "Edit Category" : "Add Category"}
                        </h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    value={categoryName}
                                    placeholder="Category Name"
                                    className="border w-full p-2 rounded-md"
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={categoryDescription}
                                    placeholder="Category Description"
                                    className="border w-full p-2 rounded-md"
                                    onChange={(e) => setCategoryDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600"
                                >
                                    {editCategory ? "Save Changes" : "Add Category"}
                                </button>
                                {editCategory && (
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="w-full rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Table Section */}
                <div className="flex-1">
                    <div className="bg-white shadow-lg rounded-md p-6">
                        <table className="w-full border border-gray-200 text-center">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-200 p-2">S No</th>
                                    <th className="border border-gray-200 p-2">Category Name</th>
                                    <th className="border border-gray-200 p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category._id}>
                                        <td className="border border-gray-200 p-2">{index + 1}</td>
                                        <td className="border border-gray-200 p-2">
                                            {category.categoryName}
                                        </td>
                                        <td className="border border-gray-200 p-2">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category._id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;

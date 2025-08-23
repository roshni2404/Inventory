// import Category from '../models/Category.js';

// // Add Category
// const addCategory = async (req, res) => {
//     try {
//         const { categoryName, categoryDescription } = req.body;

//         const existingCategory = await Category.findOne({ categoryName });
//         if (existingCategory) {
//             return res.status(400).json({ success: false, message: 'Category already exists' });
//         }

//         const newCategory = new Category({ categoryName, categoryDescription });
//         await newCategory.save();

//         return res.status(201).json({ success: true, message: 'Category added successfully' });
//     } catch (error) {
//         console.error('Error adding category:', error);
//         return res.status(500).json({ success: false, message: 'Server error' });
//     }
// };

// // Get Categories
// const getCategories = async (req, res) => {
//     try {
//         const categories = await Category.find();
//         return res.status(200).json({ success: true, categories });
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//         return res.status(500).json({ success: false, message: 'Server error' });
//     }
// };

// // Update Category
// const updateCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { categoryName, categoryDescription } = req.body;

//         const updatedCategory = await Category.findByIdAndUpdate(
//             id,
//             { categoryName, categoryDescription },
//             { new: true }
//         );

//         if (!updatedCategory) {
//             return res.status(404).json({ success: false, message: 'Category not found' });
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'Category updated successfully',
//             category: updatedCategory,
//         });
//     } catch (error) {
//         console.error('Error updating category:', error);
//         return res.status(500).json({ success: false, message: 'Server error' });
//     }
// };

// // Delete Category (optional)
// const deleteCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedCategory = await Category.findByIdAndDelete(id);
//         // If you have a Product model and want to handle products linked to this category,

//         const productCount = await ProductMdel.countDocuments({ categoryId: id });
//         if (productCount > 0) {
//             return res.status(400).json({ success: false, message: 'Cannot delete category associated with products' });
//         }

//         if (!deletedCategory) {
//             return res.status(404).json({ success: false, message: 'Category not found' });
//         }

//         return res.status(200).json({ success: true, message: 'Category deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting category:', error);
//         return res.status(500).json({ success: false, message: 'Server error' });
//     }
// };

// export { addCategory, getCategories, updateCategory, deleteCategory };










import Category from '../models/Category.js';
import Product from '../models/Product.js'; // ✅ Product import kiya

// 🟢 Add Category
const addCategory = async (req, res) => {
    try {
        const { categoryName, categoryDescription } = req.body;

        // Duplicate check
        const existingCategory = await Category.findOne({ categoryName });
        if (existingCategory) {
            return res.status(400).json({ success: false, message: 'Category already exists' });
        }

        const newCategory = new Category({ categoryName, categoryDescription });
        await newCategory.save();

        return res.status(201).json({ success: true, message: 'Category added successfully', category: newCategory });
    } catch (error) {
        console.error('Error adding category:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// 🟢 Get Categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({ success: true, categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// 🟢 Update Category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName, categoryDescription } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { categoryName, categoryDescription },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            category: updatedCategory,
        });
    } catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// 🟢 Delete Category (fixed ✅)
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // 🔎 check if products exist in this category
        const productCount = await Product.countDocuments({ categoryId: id });
        if (productCount > 0) {
            return res.status(400).json({ success: false, message: 'Cannot delete category associated with products' });
        }

        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        return res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { addCategory, getCategories, updateCategory, deleteCategory };

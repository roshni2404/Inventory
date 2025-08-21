import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

const router = express.Router();

// ✅ Public route (Customer ke liye)
router.get('/public', async (req, res) => {
    try {
        const products = await Product.find({ isDeleted: false })
            .populate("categoryId", "categoryName")   // ✅ FIXED
            .populate("supplierId", "name");         // Supplier schema me agar "name" hai

        const categories = await Category.find({}, "categoryName"); // ✅ Categories list

        res.json({ success: true, products, categories });
    } catch (error) {
        console.error("Error in /public products route:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// ✅ Admin ke liye secured routes
router.post('/add', authMiddleware, addProduct);
router.get('/', authMiddleware, getProducts);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;

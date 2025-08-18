// import express from 'express';
// import authMiddleware from '../middleware/authMiddleware.js';
// import { getProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js'; 


// const router = express.Router();

// router.post('/add', authMiddleware, addProduct);
// router.get('/', authMiddleware, getProducts);
// router.put('/:id', authMiddleware, updateProduct);
// router.delete('/:id', authMiddleware, deleteProduct);
 
// export default router;







import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import Product from '../models/Product.js';

const router = express.Router();

// ✅ Public route (Customer use karega)
router.get('/public', async (req, res) => {
    try {
        const products = await Product.find().populate("categoryId").populate("supplierId");
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// ✅ Admin ke liye secured routes
router.post('/add', authMiddleware, addProduct);
router.get('/', authMiddleware, getProducts);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;

import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getProducts, addProduct  } from '../controllers/productController.js'; 


const router = express.Router();

router.post('/add', authMiddleware, addProduct);
router.get('/', authMiddleware, getProducts);
// router.put('/:id', authMiddleware, updateSupplier);
// router.delete('/:id', authMiddleware, deleteSupplier);

export default router;






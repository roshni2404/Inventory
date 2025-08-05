import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import { addSupplier } from '../controllers/supplierController.js';

const router = express.Router();


router.post('/add', authMiddleware, );
// router.get('/', authMiddleware, getCategories);
// router.put('/:id', authMiddleware, updateCategory);
// router.delete('/:id', authMiddleware, deleteCategory);

export default router;

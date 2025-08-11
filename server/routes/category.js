// import express from 'express';
// import { addCategory, getCategories, updateCategory, deleteCategory } from '../controllers/categoryController.js';
// import authMiddleware from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Add new category
// router.post('/add', authMiddleware, addCategory);

// // Get all categories
// router.get('/', authMiddleware, getCategories);

// // Update category (use dynamic id)
// router.put('/:id', authMiddleware, updateCategory);

// // Delete category (optional)
// router.delete('/:id', authMiddleware, deleteCategory);

// export default router;






import express from "express";
import {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addCategory);
router.get("/", authMiddleware, getCategories);
router.put("/:id", authMiddleware, updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;

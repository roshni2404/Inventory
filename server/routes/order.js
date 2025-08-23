// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import { addOrder, getOrders } from "../controllers/orderController.js";

// const router = express.Router();

// // ➡️ Add new order
// router.post("/add", authMiddleware, addOrder);

// // ➡️ Get orders
// router.get("/", authMiddleware, getOrders);

// export default router;


import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

// ➡️ Add new order
router.post("/add", authMiddleware, addOrder);

// ➡️ Get orders
router.get("/", authMiddleware, getOrders);

export default router;

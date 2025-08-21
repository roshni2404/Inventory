// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import { addOrder, getOrders } from "../controllers/orderController.js";

// const router = express.Router();

// // ➡️ नया order add करने के लिए
// router.post("/add", authMiddleware, addOrder);

// // ➡️ user के सारे orders fetch करने के लिए
// router.get("/my-orders", authMiddleware, getOrders);

// export default router;




import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

// ➡️ Add new order
router.post("/", authMiddleware, addOrder);

// ➡️ Get orders
router.get("/", authMiddleware, getOrders);

export default router;

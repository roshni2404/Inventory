// import Product from '../models/Product.js';
// import Order from '../models/Order.js';

// // ➡️ Add Order
// const addOrder = async (req, res) => {
//     try {
//         const { productId, quantity, total } = req.body;
//         const userId = req.user._id;

//         const product = await Product.findById(productId);

//         if (!product) {
//             return res.status(404).json({ error: "Product not found" });
//         }

//         // Stock check
//         if (quantity > product.stock) {
//             return res.status(400).json({ error: "Not enough stock" });
//         }

//         // Reduce stock
//         product.stock -= parseInt(quantity);
//         await product.save();

//         // Create new order
//         const orderObj = new Order({
//             customer: userId,
//             product: productId,
//             quantity,
//             totalPrice: total,
//         });

//         await orderObj.save();

//         return res.status(200).json({
//             success: true,
//             message: "Order placed successfully",
//             order: orderObj,
//         });

//     } catch (error) {
//         console.log("Error in addOrder:", error);
//         return res.status(500).json({
//             success: false,
//             error: "Server error in adding order",
//         });
//     }
// };

// // ➡️ Get Orders
// const getOrders = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         let query = {};

//         // अगर customer है तो सिर्फ उसकी orders लाएंगे
//         if (req.user.role === "customer") {
//             query = { customer: userId };
//         }

//         const orders = await Order.find(query)
//             .populate({
//                 path: "product",
//                 populate: { path: "categoryId", select: "categoryName" },
//                 select: "name price",
//             })
//             .populate("customer", "name email");

//         return res.status(200).json({
//             success: true,
//             orders,
//         });

//     } catch (error) {
//         console.log("Error in getOrders:", error);
//         return res.status(500).json({
//             success: false,
//             error: "Server error in fetching orders",
//         });
//     }
// };

// export { addOrder, getOrders };







import Product from '../models/Product.js';
import Order from '../models/Order.js';

// ➡️ Add Order
const addOrder = async (req, res) => {
    try {
        const { productId, quantity, total } = req.body;
        const userId = req.user._id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Stock check
        if (quantity > product.stock) {
            return res.status(400).json({ error: "Not enough stock" });
        }

        // Reduce stock
        product.stock -= parseInt(quantity);
        await product.save();

        // Create new order
        const orderObj = new Order({
            customer: userId,
            product: productId,
            quantity,
            totalPrice: total,
        });

        await orderObj.save();

        return res.status(200).json({
            success: true,
            message: "Order placed successfully",
            order: orderObj,
        });

    } catch (error) {
        console.log("Error in addOrder:", error);
        return res.status(500).json({
            success: false,
            error: "Server error in adding order",
        });
    }
};

// ➡️ Get Orders
const getOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        let query = {};

        // अगर customer है तो सिर्फ उसकी orders लाएंगे
        if (req.user.role === "customer") {
            query = { customer: userId };
        }

        const orders = await Order.find(query)
            .populate({
                path: "product",
                populate: { path: "categoryId", select: "categoryName" },
                select: "name price stock",
            })
            .populate("customer", "name email");

        return res.status(200).json({
            success: true,
            orders,
        });

    } catch (error) {
        console.log("Error in getOrders:", error);
        return res.status(500).json({
            success: false,
            error: "Server error in fetching orders",
        });
    }
};

export { addOrder, getOrders };

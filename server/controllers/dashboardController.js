// import Product from "../models/Product.js";
// import Order from "../models/Order.js";
// import mongoose from "mongoose";

// const getDashboardData = async (req, res) => {
//     try {
//         const totalProducts = await Product.countDocuments();
//         const totalStock = await Product.aggregate([
//             { $group: { _id: null, total: { $sum: "$stock" } } }
//         ]);

//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         const ordersToday = await Order.countDocuments({
//             createdAt: { $gte: today }
//         });

//         const revenueData = await Order.aggregate([
//             { $group: { _id: null, total: { $sum: "$totalPrice" } } }
//         ]);

//         const outOfStock = await Product.find({ stock: 0 }).populate("categoryId", "categoryName");

//         // Highest Sale Product
//         const highestSale = await Order.aggregate([
//             {
//                 $group: {
//                     _id: "$product",
//                     totalQuantity: { $sum: "$quantity" }
//                 }
//             },
//             { $sort: { totalQuantity: -1 } },
//             { $limit: 1 }
//         ]);

//         let highestSaleProduct = null;
//         if (highestSale.length > 0) {
//             const product = await Product.findById(highestSale[0]._id).populate("categoryId", "categoryName");
//             highestSaleProduct = {
//                 name: product?.name || "N/A",
//                 categoryName: product?.categoryId?.categoryName || "N/A",
//                 totalQuantity: highestSale[0].totalQuantity
//             };
//         }

//         const lowStock = await Product.find({ stock: { $gt: 0, $lt: 5 } }).populate("categoryId", "categoryName");

//         res.status(200).json({
//             dashboardData: {
//                 totalProducts,
//                 totalStock: totalStock[0]?.total || 0,
//                 ordersToday,
//                 revenue: revenueData[0]?.total || 0,
//                 outOfStock,
//                 highestSaleProduct,
//                 lowStock
//             }
//         });

//     } catch (error) {
//         console.error("Error in getDashboardData:", error);
//         res.status(500).json({ error: "Server error in fetching dashboard data" });
//     }
// };

// export default getDashboardData;







import Product from "../models/Product.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";

const getDashboardData = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();

        const totalStock = await Product.aggregate([
            { $group: { _id: null, total: { $sum: "$stock" } } }
        ]);

        // ✅ Orders Today filter
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const ordersToday = await Order.countDocuments({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        // ✅ Revenue
        const revenueData = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        // ✅ Out of stock products
        const outOfStock = await Product.find({ stock: 0 }).populate("categoryId", "categoryName");

        // ✅ Highest Sale Product
        const highestSale = await Order.aggregate([
            {
                $group: {
                    _id: "$product",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 1 }
        ]);

        let highestSaleProduct = null;
        if (highestSale.length > 0) {
            const product = await Product.findById(highestSale[0]._id).populate("categoryId", "categoryName");
            highestSaleProduct = {
                name: product?.name || "N/A",
                categoryName: product?.categoryId?.categoryName || "N/A",
                totalQuantity: highestSale[0].totalQuantity
            };
        }

        // ✅ Low stock products (<5)
        const lowStock = await Product.find({ stock: { $gt: 0, $lt: 5 } }).populate("categoryId", "categoryName");

        res.status(200).json({
            dashboardData: {
                totalProducts,
                totalStock: totalStock[0]?.total || 0,
                ordersToday,
                revenue: revenueData[0]?.total || 0,
                outOfStock,
                highestSaleProduct,
                lowStock
            }
        });

    } catch (error) {
        console.error("Error in getDashboardData:", error);
        res.status(500).json({ error: "Server error in fetching dashboard data" });
    }
};

export default getDashboardData;

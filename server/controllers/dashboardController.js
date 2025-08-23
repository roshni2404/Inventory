// // import OrderModel from "../models/Order.js";
// // import Product from "../models/Product.js";

// // const getData = async (req, res) => {
// //     try {
// //         const totalProducts = await Product.countDocuments();

// //         const stockResult = await Product.aggregate([
// //             { $group: { _id: null, totalStock: { $sum: "$stock" } } }
// //         ]);
// //         const totalStock = stockResult[0]?.totalStock || 0;

// //         const startOfDay = new Date();
// //         startOfDay.setHours(0, 0, 0, 0);
// //         const endOfDay = new Date();
// //         endOfDay.setHours(23, 59, 59, 999);

// //         const ordersToday = await OrderModel.countDocuments({
// //             orderDate: { $gte: startOfDay, $lte: endOfDay }
// //         });

// //         const revenueResult = await OrderModel.aggregate([
// //             { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
// //         ]);
// //         const revenue = revenueResult[0]?.totalRevenue || 0;

// //         const outOfStock = await Product.find({ stock: 0 })
// //             .select("name stock")
// //             .populate("categoryId", "categoryName");

// //         const highestSaleResult = await OrderModel.aggregate([
// //             { $group: { _id: "$productId", totalQuantity: { $sum: "$quantity" } } }, // ✅ corrected _id
// //             { $sort: { totalQuantity: -1 } },
// //             { $limit: 1 },
// //             {
// //                 $lookup: {
// //                     from: "products",
// //                     localField: "_id",
// //                     foreignField: "_id",
// //                     as: "product"
// //                 }
// //             },
// //             { $unwind: "$product" },
// //             {
// //                 $lookup: {
// //                     from: "categories",
// //                     localField: "product.categoryId",
// //                     foreignField: "_id",
// //                     as: "category"
// //                 }
// //             },
// //             { $unwind: "$category" },
// //             {
// //                 $project: {
// //                     name: "$product.name",
// //                     category: "$category.categoryName", // ✅ fixed typo ("category Name")
// //                     totalQuantity: 1
// //                 }
// //             }
// //         ]);

// //         const highestSaleProduct =
// //             highestSaleResult[0] || { message: "No sale data available" };

// //         // low stock products
// //         const lowStock = await Product.find({ stock: { $gt: 0, $lt: 5 } })
// //             .select("name stock")
// //             .populate("categoryId", "categoryName");

// //         const dashboardData = {
// //             totalProducts,
// //             totalStock,
// //             ordersToday,
// //             revenue,
// //             outOfStock,
// //             highestSaleProduct,
// //             lowStock
// //         };

// //         return res.status(200).json({ success: true, dashboardData });
// //     } catch (error) {
// //         console.error(error);
// //         return res
// //             .status(500)
// //             .json({ success: false, message: "Error fetching dashboard summary" });
// //     }
// // };

// // export { getData };





// import OrderModel from "../models/Order.js";
// import Product from "../models/Product.js";

// // 📊 Dashboard Data
// const getData = async (req, res) => {
//     try {
//         // ✅ Total products count
//         const totalProducts = await Product.countDocuments();

//         // ✅ Total stock
//         const stockResult = await Product.aggregate([
//             { $group: { _id: null, totalStock: { $sum: "$stock" } } }
//         ]);
//         const totalStock = stockResult[0]?.totalStock || 0;

//         // ✅ Orders today
//         const startOfDay = new Date();
//         startOfDay.setHours(0, 0, 0, 0);
//         const endOfDay = new Date();
//         endOfDay.setHours(23, 59, 59, 999);

//         const ordersToday = await OrderModel.countDocuments({
//             orderDate: { $gte: startOfDay, $lte: endOfDay }
//         });

//         // ✅ Total revenue
//         const revenueResult = await OrderModel.aggregate([
//             { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
//         ]);
//         const revenue = revenueResult[0]?.totalRevenue || 0;

//         // ✅ Out of stock products
//         const outOfStock = await Product.find({ stock: 0 })
//             .select("name stock categoryId")
//             .populate("categoryId", "categoryName");

//         // ✅ Low stock products (less than 5 but not 0)
//         const lowStock = await Product.find({ stock: { $gt: 0, $lt: 5 } })
//             .select("name stock categoryId")
//             .populate("categoryId", "categoryName");

//         // ✅ Highest sale product
//         const highestSaleResult = await OrderModel.aggregate([
//             {
//                 $group: {
//                     _id: "$productId",
//                     totalQuantity: { $sum: "$quantity" }
//                 }
//             },
//             { $sort: { totalQuantity: -1 } },
//             { $limit: 1 },
//             {
//                 $lookup: {
//                     from: "products",
//                     localField: "_id",
//                     foreignField: "_id",
//                     as: "product"
//                 }
//             },
//             { $unwind: "$product" },
//             {
//                 $lookup: {
//                     from: "categories",
//                     localField: "product.categoryId",
//                     foreignField: "_id",
//                     as: "category"
//                 }
//             },
//             { $unwind: "$category" },
//             {
//                 $project: {
//                     name: "$product.name",
//                     categoryName: "$category.categoryName", // ✅ correct field
//                     totalQuantity: 1
//                 }
//             }
//         ]);

//         const highestSaleProduct =
//             highestSaleResult[0] || null;

//         // ✅ Final dashboard data
//         const dashboardData = {
//             totalProducts,
//             totalStock,
//             ordersToday,
//             revenue,
//             outOfStock,
//             highestSaleProduct,
//             lowStock
//         };

//         return res.status(200).json({ success: true, dashboardData });
//     } catch (error) {
//         console.error(error);
//         return res
//             .status(500)
//             .json({ success: false, message: "Error fetching dashboard summary" });
//     }
// };

// export { getData };






import Product from "../models/Product.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";

const getDashboardData = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalStock = await Product.aggregate([
            { $group: { _id: null, total: { $sum: "$stock" } } }
        ]);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const ordersToday = await Order.countDocuments({
            createdAt: { $gte: today }
        });

        const revenueData = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        const outOfStock = await Product.find({ stock: 0 }).populate("categoryId", "categoryName");

        // Highest Sale Product
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


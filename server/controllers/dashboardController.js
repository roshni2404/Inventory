import OrderModel from "../models/Order.js";
import Product from "../models/Product.js";

const getData = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();

        const stockResult = await Product.aggregate([
            { $group: { _id: null, totalStock: { $sum: "$stock" } } }
        ]);
        const totalStock = stockResult[0]?.totalStock || 0;

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const ordersToday = await OrderModel.countDocuments({
            orderDate: { $gte: startOfDay, $lte: endOfDay }
        });

        const revenueResult = await OrderModel.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
        ]);
        const revenue = revenueResult[0]?.totalRevenue || 0;

        const outOfStock = await Product.find({ stock: 0 })
            .select("name stock")
            .populate("categoryId", "categoryName");

        const highestSaleResult = await OrderModel.aggregate([
            { $group: { _id: "$productId", totalQuantity: { $sum: "$quantity" } } }, // ✅ corrected _id
            { $sort: { totalQuantity: -1 } },
            { $limit: 1 },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            { $unwind: "$product" },
            {
                $lookup: {
                    from: "categories",
                    localField: "product.categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind: "$category" },
            {
                $project: {
                    name: "$product.name",
                    category: "$category.categoryName", // ✅ fixed typo ("category Name")
                    totalQuantity: 1
                }
            }
        ]);

        const highestSaleProduct =
            highestSaleResult[0] || { message: "No sale data available" };

        // low stock products
        const lowStock = await Product.find({ stock: { $gt: 0, $lt: 5 } })
            .select("name stock")
            .populate("categoryId", "categoryName");

        const dashboardData = {
            totalProducts,
            totalStock,
            ordersToday,
            revenue,
            outOfStock,
            highestSaleProduct,
            lowStock
        };

        return res.status(200).json({ success: true, dashboardData });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Error fetching dashboard summary" });
    }
};

export { getData };




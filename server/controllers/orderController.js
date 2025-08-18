import Product from '../models/Product.js';
import Order from '../models/Order.js';

const addOrder = async (req, res) => {

    try {
        const {productId, quantity, total} = req.body;
        const userId = req.user._id;
        const product = await Product.finallyId({_id: productId});
        if(!product) {
            return res.status(404).json({error: "product not found in order"});
        }

        if(quantity > product.stock) {
            return res.status(400).json({error: "Not enough stock"});
        } else {
            product.stock -= parseInt(quantity);
            await product.save();
        }

        const orderObj = new Order({
            customer: userId,
            product: productId,
            quantity,
            totalPrice: total
        })
        await orderObj.save();

        return res.status(200)({success: true, message: "Order added successfully"});
    } catch(error) {
        console.log(error);
        return res.status(500).json({success: false, error: "server error in adding order"});
    }

}

 const getOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({customer: userId}).populate({path: 'product', populate: {
            path: 'categoryId',
            select: 'categoryName'
        }, select: 'name price'}).populate('customer', 'name email');
        return res.status(200).json({success: true, orders});
    } catch(error) {
        console.log(error);
        return res.status(500)({success: false, error: "server error in fetching orders"});
    }
 }

export {addOrder, getOrders};



// import Product from '../models/Product.js';
// import Order from '../models/Order.js';

// // ➡️ Add Order
// const addOrder = async (req, res) => {
//     try {
//         const { productId, quantity, total } = req.body;
//         const userId = req.user._id;

//         // ❌ गलती थी: Product.finallyId → 
//         // ✅ सही: Product.findById
//         const product = await Product.findById(productId);

//         if (!product) {
//             return res.status(404).json({ error: "Product not found in order" });
//         }

//         // Stock check
//         if (quantity > product.stock) {
//             return res.status(400).json({ error: "Not enough stock" });
//         }

//         // Stock reduce
//         product.stock -= parseInt(quantity);
//         await product.save();

//         // New order
//         const orderObj = new Order({
//             customer: userId,
//             product: productId,
//             quantity,
//             totalPrice: total,
//         });

//         await orderObj.save();

//         // ❌ आपकी गलती: res.status(200)({...})
//         // ✅ सही: res.status(200).json({...})
//         return res.status(200).json({
//             success: true,
//             message: "Order added successfully",
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

//         const orders = await Order.find({ customer: userId })
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

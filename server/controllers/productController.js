import Supplier from "../models/Supplier.js"
import Category from "../models/Category.js"
import Product from "../models/Product.js"


const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, categoryId, supplierId } = req.body;


       
        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            categoryId,
            supplierId
         });
        await newProduct.save();
        return res.status(201).json({ success: true, message: 'Product added successfully' });
    } catch (error) {
        console.error('Error adding Product:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categoryId').populate('supplierId');
        const suppliers = await Supplier.find();
        const categories = await Category.find();
        return res.status(200).json({ success: true, products, suppliers, categories });
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        return res.status(500).json({ success: false, message: 'Server error in getting suppliers' });
    }
};

export { getProducts, addProduct };





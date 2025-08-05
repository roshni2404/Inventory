import Supplier from '../models/Supplier.js';

// Add Category
const addSupplier = async (req, res) => {
    try {
        const { name, email, number, address } = req.body;

        const existingSupplier = await Supplier.findOne({ name });
        if (existingSupplier) {
            return res.status(400).json({ success: false, message: 'Supplier already exists'});
        }

        const newSupplier = new Supplier({ 
            name,
            email,
            number,
            address
        });
        await newSupplier.save();

        return res.status(201).json({ success: true, message: 'Supplier added successfully' });
    } catch (error) {
        console.error('Error adding supplier:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};



export { addSupplier };

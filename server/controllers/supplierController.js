import Supplier from '../models/Supplier.js';
import Product from '../models/Product.js'; 

const addSupplier = async (req, res) => {
    try {
        const { name, email, number, address } = req.body;
        const existingSupplier = await Supplier.findOne({ name });
        if (existingSupplier) {
            return res.status(400).json({ success: false, message: 'Supplier already exists' });
        }
        const newSupplier = new Supplier({ name, email, number, address });
        await newSupplier.save();
        return res.status(201).json({ success: true, message: 'Supplier added successfully' });
    } catch (error) {
        console.error('Error adding supplier:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        return res.status(200).json({ success: true, suppliers });
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, number, address } = req.body;
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id,
            { name, email, number, address },
            { new: true }
        );

        if (!updatedSupplier) {
            return res.status(404).json({ success: false, message: 'Supplier not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Supplier updated successfully',
            supplier: updatedSupplier,
        });
    } catch (error) {
        console.error('Error updating Supplier:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;

         const productCount = await Product.countDocuments({ supplierId: id });
                if (productCount > 0) {
                    return res.status(400).json({ success: false, message: 'Cannot delete supplier associated with products' });
                }
        const deleted = await Supplier.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Supplier not found' });
        }
        return res.status(200).json({ success: true, message: 'Supplier deleted successfully' });
    } catch (error) {
        console.error('Error deleting Supplier:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { addSupplier, getSuppliers, updateSupplier, deleteSupplier };












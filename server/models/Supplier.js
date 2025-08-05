import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
          

});

const SupplierModel = mongoose.model("Supplier", supplierSchema);
export default SupplierModel;

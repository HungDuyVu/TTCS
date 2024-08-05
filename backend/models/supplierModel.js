const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    address: String,
    productsSupplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImportOrder' }]
}, {
    timestamps: true
});

const supplierModel = mongoose.model('Supplier', supplierSchema);
module.exports = supplierModel;
const mongoose = require('mongoose');

const wareHouseSchema = new mongoose.Schema({
    warehouseName: String,
    warehousePhoneNumber: String,
    warehouseAddress: String,
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 0 }
    }],
    suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }],
    importOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImportOrder' }]
}, {
    timestamps: true
});

const warehouseModel = mongoose.model('Warehouse', wareHouseSchema);
module.exports = warehouseModel;

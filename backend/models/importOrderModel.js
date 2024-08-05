const mongoose = require('mongoose');

const importOrderSchema = new mongoose.Schema({
    orderCode: { type: String, required: true },
    importedBy: { type: String, required: true }, // Thêm trường người nhập hàng
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    importDate: { type: Date, required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true } 
}, {
    timestamps: true
});

const importOrderModel = mongoose.model('ImportOrder', importOrderSchema);
module.exports = importOrderModel;


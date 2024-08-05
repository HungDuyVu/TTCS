const Supplier = require("../../models/supplierModel");
const Product = require('../../models/productModel');
const ImportOrder = require('../../models/importOrderModel');

async function deleteSupplier(req, res) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    try {
        // Xóa nhà cung cấp
        const supplier = await Supplier.findByIdAndDelete(id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        // Xóa nhà cung cấp khỏi các sản phẩm liên quan
        await Product.updateMany(
            { suppliers: id },
            { $pull: { suppliers: id } }
        );

        // Xóa nhà cung cấp khỏi các đơn hàng nhập khẩu liên quan
        await ImportOrder.updateMany(
            { supplier: id },
            { $pull: { supplier: id } }
        );

        res.json({ 
            message: 'Supplier deleted successfully' ,
            success: true,
            error: false,
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message ,
            success: false,
            error: true,
        });
    }
}

module.exports = deleteSupplier;

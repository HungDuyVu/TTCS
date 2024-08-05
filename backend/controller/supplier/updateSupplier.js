const Supplier = require("../../models/supplierModel");
const Product = require('../../models/productModel');
const ImportOrder = require('../../models/importOrderModel');

async function updateSupplier(req, res) {
    const { id, updateData } = req.body;

    if (!id || !updateData) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    try {
        // Cập nhật nhà cung cấp
        const supplier = await Supplier.findByIdAndUpdate(id, updateData, { new: true });

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        // Nếu có cập nhật danh sách sản phẩm cung cấp, cần cập nhật ở các sản phẩm tương ứng
        if (updateData.productsSupplied) {
            // Xóa nhà cung cấp khỏi các sản phẩm không còn được cung cấp bởi nhà cung cấp này
            await Product.updateMany(
                { suppliers: id },
                { $pull: { suppliers: id } }
            );
            // Thêm nhà cung cấp vào các sản phẩm mới được cung cấp
            await Product.updateMany(
                { _id: { $in: updateData.productsSupplied } },
                { $addToSet: { suppliers: id } }
            );
        }

        // Cập nhật thông tin nhà cung cấp trong các đơn hàng nhập khẩu nếu cần
        if (updateData.orders) {
            // Xóa nhà cung cấp khỏi các đơn hàng không còn liên quan đến nhà cung cấp này
            await ImportOrder.updateMany(
                { supplier: id },
                { $pull: { supplier: id } }
            );
            // Thêm nhà cung cấp vào các đơn hàng mới liên quan
            await ImportOrder.updateMany(
                { _id: { $in: updateData.orders } },
                { $addToSet: { supplier: id } }
            );
        }

        res.json(({
            message: 'Supplier updated successfully',
            error: false,
            success: true,
            data: supplier,
        }));
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            success: false,
            error: true,
        });
    }
}

module.exports = updateSupplier;

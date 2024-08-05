const importOrderModel = require('../../models/importOrderModel');
const supplierModel = require('../../models/supplierModel');

const deleteImportOrder = async (req, res) => {
    const { orderId } = req.body;

    try {
        console.log(`Received request to delete order with ID: ${orderId}`);

        // Xóa đơn hàng
        const deleteResult = await importOrderModel.findByIdAndDelete(orderId);
        console.log(`Delete result: ${JSON.stringify(deleteResult)}`);

        if (!deleteResult) {
            console.log('Order not found.');
            return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
        }

        // Xóa đơn hàng khỏi nhà cung cấp
        const updateResult = await supplierModel.updateMany(
            { orders: orderId },
            { $pull: { orders: orderId } }
        );
        console.log(`Update result: ${JSON.stringify(updateResult)}`);

        res.json({ success: true, message: 'Đã xóa đơn hàng thành công' });
    } catch (error) {
        console.error('Error deleting import order:', error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi' });
    }
};

module.exports = deleteImportOrder;

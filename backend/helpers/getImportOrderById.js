const importOrderModel = require('../models/importOrderModel');

const getImportOrderById = async (req, res) => {
    try {
        const orderId = req.body.orderId; // Lấy ID đơn hàng nhập từ request body
        const importOrder = await importOrderModel.findById(orderId); // Tìm đơn hàng nhập trong database dựa trên ID
        if (!importOrder) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Import order not found"
            });
        }
        // Nếu đơn hàng nhập được tìm thấy, trả về thông tin của đơn hàng nhập
        return res.json({
            success: true,
            error: false,
            data: importOrder
        });
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình tìm kiếm đơn hàng nhập
        console.error("Error while fetching import order by ID:", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error"
        });
    }
};

module.exports = getImportOrderById;

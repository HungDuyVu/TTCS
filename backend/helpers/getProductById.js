const productModel = require('../models/productModel')

const getProductById = async (req, res) => {
    try {
        const productId = req.body.productId; // Lấy ID sản phẩm từ request body
        const product = await productModel.findById(productId); // Tìm sản phẩm trong database dựa trên ID
        if (!product) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Product not found"
            });
        }
        // Nếu sản phẩm được tìm thấy, trả về thông tin của sản phẩm
        return res.json({
            success: true,
            error: false,
            data: product
        });
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình tìm kiếm sản phẩm
        console.error("Error while fetching product by ID:", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error"
        });
    }
};

module.exports = getProductById;

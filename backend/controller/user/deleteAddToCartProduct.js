const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProduct = async (req, res) => {
    try {
        const addToCartProductId = req.body._id;
        const currentUser = req.userId; // Lấy userId từ phiên đăng nhập hoặc token

        // Kiểm tra và xóa sản phẩm khỏi giỏ hàng của người dùng hiện tại
        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId, userId: currentUser });

        if (deleteProduct.deletedCount === 0) {
            return res.json({
                message: "Product not found in cart or not authorized to delete",
                error: true,
                success: false
            });
        }

        res.json({
            message: "Product Deleted From Cart",
            error: false,
            success: true,
            data: deleteProduct
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = deleteAddToCartProduct;

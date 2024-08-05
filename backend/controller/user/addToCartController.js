const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body; // Lấy productId từ body của request
        const currentUser = req.userId; // Lấy userId từ request

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng của người dùng hay chưa
        const isProductAvailable = await addToCartModel.findOne({ productId: productId, userId: currentUser });
        // A: product X, id User 1
        // B: product X, id user 2

        console.log("isProductAvailable", isProductAvailable);

        if (isProductAvailable) {
            return res.json({
                message: "Already exists in Add to cart",
                success: false,
                error: true
            });
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        };

        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        return res.json({
            data: saveProduct,
            message: "Product Added in Cart",
            success: true,
            error: false
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = addToCartController;

const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");
const supplierModel = require("../../models/supplierModel");

const UploadProductController = async (req, res) => {
    try {
        const sessionUserId = req.userId;

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }

        // Lưu sản phẩm vào cơ sở dữ liệu
        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();

        // Lấy _id của sản phẩm vừa lưu
        const productId = saveProduct._id;

        // Thêm _id của sản phẩm vào danh sách productsSupplied của các nhà cung cấp
        await supplierModel.updateMany(
            { _id: { $in: req.body.suppliers} },
            { $push: { productsSupplied:  productId } }
        );

        res.status(200).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct
        });

    } catch (err) {
        res.status(401).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = UploadProductController;

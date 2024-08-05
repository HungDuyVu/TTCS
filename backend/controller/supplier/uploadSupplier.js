const uploadProductPermission = require("../../helpers/permission");
const supplierModel = require("../../models/supplierModel");

const UploadSupplierController = async (req, res) => {
    try {
        const sessionUserId = req.userId;

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }

        const uploadSupplier = new supplierModel(req.body);
        const saveSupplier = await uploadSupplier.save();

        res.status(200).json({
            message : "Supplier upload successfully",
            error : false,
            success : true,
            data : saveSupplier
        })
    }
    catch (error) {
        res.status(401).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = UploadSupplierController;
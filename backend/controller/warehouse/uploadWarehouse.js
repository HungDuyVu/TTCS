const uploadInventoryPermission = require("../../helpers/permission");
const warehouseModel = require("../../models/warehouseModel");

const uploadWarehouse = async (req, res) => {
    try {
        const sessionUserId = req.userId;

        if (!uploadInventoryPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }

        // Lưu mục nhập vào cơ sở dữ liệu
        const uploadItem = new warehouseModel(req.body);
        const savedItem = await uploadItem.save();

        res.status(200).json({
            message: "Warehouse item uploaded successfully",
            error: false,
            success: true,
            data: savedItem
        });

    } catch (err) {
        res.status(401).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = uploadWarehouse;

const warehouseModel = require("../../models/warehouseModel");

const getWarehouse = async (req, res) => {
    try {
        const allWarehouse = await warehouseModel
            .find()
            // .populate('products suppliers importOrder') 
            .sort({ createdAt: -1 });

        res.json({
            message: "All warehouse",
            success: true,
            data: allWarehouse
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Failed to fetch warehouse",
            error: true,
            success: false
        });
    }
};

module.exports = getWarehouse;


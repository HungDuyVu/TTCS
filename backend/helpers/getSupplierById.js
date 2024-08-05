const supplierModel = require("../models/supplierModel");

const getSupplierById = async (req, res) => {
    try {
        const supplierId = req.body.supplierId
        const supplier = await supplierModel.findById(supplierId);
        if (!supplier) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Supplier not found"
            });
        }
        else res.json({
            success: true,
            error: false,
            data: supplier
        })
    }
    catch (error) {
        console.error("Error while fetching Supplier by ID:", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error"
        });
    }
}

module.exports = getSupplierById;
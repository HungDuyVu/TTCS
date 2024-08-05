const supplierModel = require("../../models/supplierModel");

const getSupplierController = async (req, res) => {
    try {
        const allSupplier = await supplierModel.find().sort({createdAt: -1})
        res.json({
            message : "All supplier",
            success : true,
            error : false,
            data : allSupplier
        })
    }
    catch (error) {
        res.status(400).json({
            message : error.message ,
            error : true,
            success : false
        })
    }
}

module.exports = getSupplierController;
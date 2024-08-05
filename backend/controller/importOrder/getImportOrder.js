const importOrderModel = require('../../models/importOrderModel')

const getImportOrder = async (req, res) => {
    try {
        const allImportOrder = await importOrderModel.find().sort({createAt: -1})
        res.json({
            message : "All Import order",
            success : true,
            error : false,
            data : allImportOrder
        })
    }
    catch (error) {
        res.status(400).json({
            message : error.message,
            error : true,
            success : false
        })
    }
}

module.exports = getImportOrder;
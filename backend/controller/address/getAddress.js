const AddressDelivery = require("../../models/addressModel");

const getAddress = async(req, res) => {
    try {
        const allAddress = await AddressDelivery.find().sort({createdAt: - 1})
        res.json({
            message : "All address",
            success : true,
            error : false,
            data : allAddress
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

module.exports = getAddress;
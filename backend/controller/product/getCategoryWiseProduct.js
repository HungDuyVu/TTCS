const productModel = require("../../models/productModel")

const getCategoryWiseProduct = async(req,res)=>{
    try{
        // Nếu yêu cầu HTTP là POST, dữ liệu thường được gửi qua req.body.
        // Nếu yêu cầu HTTP là GET, dữ liệu thường được gửi qua req.query.
        const { category } = req?.body || req?.query
        const product = await productModel.find({ category })

        res.json({
            data : product,
            message : "Product",
            success : true,
            error : false
        })
    }
    catch(err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getCategoryWiseProduct
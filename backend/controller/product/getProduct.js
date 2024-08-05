const productModel = require("../../models/productModel")

const getProductController = async(req,res)=>{
    try{
        // sap xep theo thu tu giam dan
        const allProduct = await productModel.find().sort({ createdAt : -1 })
        console.log('all product', allProduct);

        res.json({
            message : "All Product",
            success : true,
            error : false,
            data : allProduct
        })

    }
    catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }

}

module.exports = getProductController
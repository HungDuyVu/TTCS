const productModel = require("../../models/productModel")

const searchProduct = async(req,res)=>{
    try {
        // Lay tu khoa itm kiem
        const query = req.query.q 

        // i: khong phan biet hoa thuong, g: tim kiem toan bo chuoi
        const regex = new RegExp(query,'i','g')

        // Tim kiem neu mot trong nhung dieu kien dung (or)
        const product = await productModel.find({
            "$or" : [
                {
                    productName : regex
                },
                {
                    category : regex
                }
            ]
        })

        res.json({
            data  : product ,
            message : "Search Product list",
            error : false,
            success : true
        })
    }
    catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = searchProduct
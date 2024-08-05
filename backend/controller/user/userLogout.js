async function userLogout(req,res){
    try{
        // xóa cookie token khỏi truỳnh duyết => người dùng bị logout ra khỏi web
        res.clearCookie("token")

        res.json({
            message : "Logged out successfully",
            error : false,
            success : true,
            data : []
        })
    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}


module.exports = userLogout
const jwt = require('jsonwebtoken')

function authToken(req, res, next) {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.status(401).json({
                message: "Please Login...!",
                error: true,
                success: false
            })
        }
        
        const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY

        jwt.verify(token, TOKEN_SECRET_KEY, function(err, decoded) {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        message: "Token expired",
                        error: true,
                        success: false
                    })
                } else {
                    return res.status(401).json({
                        message: "Invalid token",
                        error: true,
                        success: false
                    })
                }
            }

            req.userId = decoded?._id

            next()
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        })
    }
}

module.exports = authToken

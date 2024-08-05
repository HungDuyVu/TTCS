const bcrypt = require('bcryptjs'); // Import thư viện bcryptjs để so sánh mật khẩu
const userModel = require('../../models/userModel'); // Import mô hình người dùng từ cơ sở dữ liệu
const jwt = require('jsonwebtoken'); // Import thư viện jsonwebtoken để tạo JWT

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body; // Lấy dữ liệu từ yêu cầu đăng nhập

        if (!email || !password) {
            throw new Error("Please provide email and password"); // Nếu thiếu email hoặc mật khẩu, ném lỗi
        }

        const user = await userModel.findOne({ email }); // Tìm người dùng theo email

        if (!user) {
            throw new Error("User not found"); // Nếu người dùng không tồn tại, ném lỗi
        }

        const checkPassword = await bcrypt.compare(password, user.password); // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong cơ sở dữ liệu

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY; // Khóa bí mật để tạo JWT
            const token = await jwt.sign(tokenData, TOKEN_SECRET_KEY, { expiresIn: '8h' }); // Tạo JWT với dữ liệu người dùng và thời gian hết hạn 8 giờ

            const tokenOption = {
                httpOnly: true, // Cookie chỉ có thể được truy cập từ phía máy chủ, không từ JavaScript trên trình duyệt
                secure: process.env.NODE_ENV === 'production', // Sử dụng secure trong môi trường production để gửi cookie qua HTTPS
                sameSite: 'strict' // Cài đặt SameSite để ngăn chặn cookie được gửi trong các yêu cầu cross-site
            };

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully", // Thông báo đăng nhập thành công
                data: token, // Trả về token JWT
                success: true,
                error: false
            });
        } else {
            throw new Error("Incorrect password"); 
        }
    } catch (err) {
        res.status(400).json({
            message: err.message || "Failed to sign in", 
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController; 

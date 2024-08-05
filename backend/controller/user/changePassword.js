const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function changePasswordController(req, res) {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        const userId = req.userId;

        // Kiểm tra tính hợp lệ của dữ liệu đầu vào
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            throw new Error("Please provide current password, new password, and confirm new password");
        }
        if (newPassword !== confirmNewPassword) {
            throw new Error("New password and confirm new password do not match");
        }

        // Lấy thông tin người dùng từ cơ sở dữ liệu
        const user = await userModel.findById(userId);

        // So sánh mật khẩu cũ với mật khẩu trong cơ sở dữ liệu
        const checkPassword = await bcrypt.compare(currentPassword, user.password);
        if (!checkPassword) {
            throw new Error("Incorrect current password");
        }

        // Mã hóa mật khẩu mới
        const salt = bcrypt.genSaltSync(10);
        const hashNewPassword = await bcrypt.hashSync(newPassword, salt);

        // Cập nhật mật khẩu mới trong cơ sở dữ liệu
        user.password = hashNewPassword;
        await user.save();

        res.status(200).json({
            message: "Password updated successfully",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || "Failed to update password",
            error: true,
            success: false,
        });
    }
}

module.exports = changePasswordController;

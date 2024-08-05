const checkPasswordImportOrder = async (req, res) => {
    const { confirmationCode } = req.body;

    try {
        const defaultConfirmationCode = '0987'; // Mã xác nhận mặc định của bạn
        if (confirmationCode === defaultConfirmationCode) {
            res.json({ success: true, message: 'Mã xác nhận đúng' });
        } else {
            res.status(401).json({ success: false, message: 'Mã xác nhận không đúng' });
        }
    } catch (error) {
        console.error('Error checking confirmation code:', error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi' });
    }
};

module.exports = checkPasswordImportOrder;

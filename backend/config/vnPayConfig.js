const vnPayConfig = async () => {
    try {
        // Cấu hình VNPay
        const vnp_TmnCode = 'MZHISJLF';
        const vnp_HashSecret = 'M7N36Q35DIEUWRHI5VRZJKDGEPHJU7EO';
        const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        const merchantAdmin = {
            username: 'vuhuyhung.work@gmail.com',
            password: '1602v2002H'
        };

        // Log thành công khi cấu hình hoàn tất
        console.log('Initialized VNPay configuration successfully');

        return {
            vnp_TmnCode,
            vnp_HashSecret,
            vnp_Url,
            merchantAdmin
        };
    } catch (error) {
        // Xử lý lỗi nếu có vấn đề xảy ra
        console.error('Error initializing VNPay configuration:', error.message);
        throw error; // Ném lỗi để báo hiệu rằng quá trình cấu hình không thành công
    }
};

module.exports = vnPayConfig;
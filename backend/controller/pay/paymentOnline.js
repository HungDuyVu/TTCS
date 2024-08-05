const axios = require('axios');
const nodemailer = require('nodemailer'); // Thư viện để gửi email
const vnPayConfig = require('../../config/vnPayConfig');
const qs = require('qs'); 
const crypto = require('crypto'); 

// Hàm gửi email thông báo
const sendOrderConfirmationEmail = async (recipientEmail, orderId, totalAmount, paymentProducts) => {
    try {
        // Cấu hình transporter để gửi email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vuhuyhung@gmail.com', // Địa chỉ email của bạn
                pass: '1602v2002H', 
            },
        });

        // Định dạng nội dung email
        const mailOptions = {
            from: 'vuhuyhung@gmail.com', // Địa chỉ email của bạn
            to: recipientEmail,
            subject: 'Xác nhận đơn hàng thành công',
            html: `
                <h1>Xin chào,</h1>
                <p>Chúc mừng! Đơn hàng của bạn đã được đặt hàng thành công.</p>
                <p>Mã đơn hàng: ${orderId}</p>
                <p>Tổng số tiền thanh toán: ${totalAmount} VND</p>
                <p>Danh sách các sản phẩm đã đặt:</p>
                <ul>
                    ${paymentProducts.map(product => `<li>${product.productId.productName}</li>`).join('')}
                </ul>
                <p>Chúng tôi sẽ tiếp tục xử lý và sẽ thông báo cho bạn khi đơn hàng được gửi đi.</p>
                <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
            `,
        };

        // Gửi email thông báo
        await transporter.sendMail(mailOptions);
        console.log(`Đã gửi email xác nhận đơn hàng thành công đến ${recipientEmail}`);
    } catch (error) {
        console.error('Lỗi khi gửi email thông báo:', error.message);
        throw error; // Ném lỗi để báo hiệu rằng quá trình gửi email không thành công
    }
};

// Hàm xử lý thanh toán online
const paymentOnline = async (req, res) => {
    try {
        // Lấy thông tin từ req.body
        const { orderId, totalAmount, paymentProducts, userAddress, userEmail } = req.body;

        // Lấy cấu hình từ VNPay config
        const { vnp_TmnCode, vnp_HashSecret, vnp_Url, merchantAdmin } = await vnPayConfig();

        // Tạo dữ liệu thanh toán
        const paymentData = {
            vnp_Version: '2.0.0',
            vnp_Command: 'pay',
            vnp_TmnCode: vnp_TmnCode,
            vnp_Amount: totalAmount * 100, // Số tiền thanh toán (đơn vị: VNĐ)
            vnp_CurrCode: 'VND',
            vnp_BankCode: '', // Mã ngân hàng của khách hàng, có thể để trống
            vnp_TxnRef: orderId, // Mã tham chiếu giao dịch, đảm bảo duy nhất cho mỗi giao dịch
            vnp_OrderInfo: `Thanh toán đơn hàng ${orderId}`,
            vnp_OrderType: 'billpayment',
            vnp_Locale: 'vn',
            vnp_ReturnUrl: 'http://localhost:3000/payment/callback', // URL trả về sau khi thanh toán thành công
            vnp_IpAddr: req.ip, // Địa chỉ IP của khách hàng
            vnp_CreateDate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''), // Thời điểm tạo giao dịch
            vnp_BrowserInfo: req.headers['user-agent'], // Thông tin trình duyệt của khách hàng
        };

        // Sắp xếp các thông tin trước khi mã hóa
        let sortedData = {};
        Object.keys(paymentData)
            .sort()
            .forEach(key => {
                if (paymentData[key] !== '') {
                    sortedData[key] = paymentData[key];
                }
            });

        // Tạo chuỗi dữ liệu cần mã hóa
        let querystring = qs.stringify(sortedData);
        querystring = decodeURIComponent(querystring);

        // Thêm chuỗi bí mật vào dữ liệu
        const signData = vnp_HashSecret + querystring;

        // Mã hóa chuỗi ký tự
        const vnp_SecureHash = crypto
            .createHash('SHA256')
            .update(signData)
            .digest('hex');

        // Thêm hash vào dữ liệu thanh toán
        paymentData['vnp_SecureHashType'] = 'SHA256';
        paymentData['vnp_SecureHash'] = vnp_SecureHash;

        // Gửi yêu cầu thanh toán tới VNPay (bỏ qua kết quả trả về, giả định thành công)
        await axios.post(vnp_Url, qs.stringify(paymentData), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Giả lập thanh toán thành công
        const responseData = {
            vnp_TransactionStatus: '00', // Mã thành công của VNPay
            vnp_TxnRef: orderId,
            vnp_Amount: totalAmount * 100,
        };

        // Gửi email thông báo
        await sendOrderConfirmationEmail(userEmail, orderId, totalAmount, paymentProducts);

        // Redirect đến VNPay để thanh toán
        res.status(200).json({ success: true, message: 'Thanh toán thành công', data: responseData });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xử lý thanh toán', error: error.message });
    }
};

module.exports = paymentOnline;

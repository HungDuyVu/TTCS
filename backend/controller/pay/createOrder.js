const Order = require('../../models/orderModel');

const createOrder = async (req, res) => {
    const orderData = req.body;

    try {
        // Validate input data
        if (!orderData.user || !Array.isArray(orderData.products) || orderData.products.length === 0 || !orderData.totalProductAmount) {
            throw new Error('Invalid request data');
        }

        // Create a new order object
        const newOrder = new Order({
            user: orderData.user,
            products: orderData.products.map(product => ({
                product: product.product._id, // Ensure product.productId._id is correct
                quantity: product.quantity
            })),
            totalProductAmount: orderData.totalProductAmount,
            shippingFee: orderData.shippingFee || 0,
            totalOrderAmount: orderData.totalProductAmount + (orderData.shippingFee || 0),
            paymentMethod: orderData.paymentMethod,
            status: 'Đang xử lý',
            userAddress: orderData.userAddress, // Add userAddress field
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();
        console.log('Order saved successfully:', savedOrder);

        res.status(201).json({ success: true, data: savedOrder });
    } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
    }
};

module.exports = createOrder;

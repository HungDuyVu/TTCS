const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    profilePic: String,
    role: String,
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AddressDelivery' }], 
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
}, {
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

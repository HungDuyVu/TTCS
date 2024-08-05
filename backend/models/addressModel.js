const mongoose = require('mongoose');

const addressDeliverySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipientName: {type: String, required: true},
    address:  {type: String, required: true},
    phoneNumber:  {type: String, required: true}
}, {
    timestamps: true
});

const AddressDelivery = mongoose.model('AddressDelivery', addressDeliverySchema);
module.exports = AddressDelivery;
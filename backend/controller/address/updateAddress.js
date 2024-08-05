const AddressDelivery = require("../../models/addressModel");

const updateAddress = async (req, res) => {
    try {
        const { addressId, recipientName, address, phoneNumber } = req.body;

        // Kiểm tra dữ liệu hợp lệ
        if (!addressId || !recipientName || !address || !phoneNumber) {
            return res.status(400).json({
                message: "All fields (addressId, recipientName, address, phoneNumber) are required",
                success: false
            });
        }

        // Tạo đối tượng payload từ dữ liệu mới cần cập nhật
        const payload = {
            recipientName,
            address,
            phoneNumber
        };

        // Cập nhật địa chỉ dựa trên addressId
        const updatedAddress = await AddressDelivery.findByIdAndUpdate(
            addressId,
            payload,
            { new: true } // Trả về đối tượng đã được cập nhật
        );

        if (!updatedAddress) {
            return res.status(404).json({
                message: "Address not found",
                success: false
            });
        }

        res.json({
            data: updatedAddress,
            message: "Address updated successfully",
            success: true
        });
    } catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({
            message: error.message || "Internal server error",
            success: false
        });
    }
};

module.exports = updateAddress;

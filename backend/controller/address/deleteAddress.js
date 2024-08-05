const AddressDelivery = require("../../models/addressModel");
const User = require("../../models/userModel");

const deleteAddress = async (req, res) => {
    try {
        const addressId = req.body._id;

        // Find the address
        const address = await AddressDelivery.findById(addressId);
        if (!address) {
            return res.json({
                message: "Address not found",
                error: true,
                success: false
            });
        }

        // Delete the address from AddressDelivery collection
        const deleteAddressResult = await AddressDelivery.deleteOne({ _id: addressId });
        if (deleteAddressResult.deletedCount === 0) {
            return res.json({
                message: "Failed to delete address",
                error: true,
                success: false
            });
        }

        // Update the user's addresses array
        const userUpdateResult = await User.updateOne(
            { _id: address.user },
            { $pull: { addresses: addressId } }
        );

        if (userUpdateResult.modifiedCount === 0) {
            return res.json({
                message: "Failed to update user addresses",
                error: true,
                success: false
            });
        }

        res.json({
            message: "Address deleted successfully",
            error: false,
            success: true,
            data: deleteAddressResult
        });
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = deleteAddress;

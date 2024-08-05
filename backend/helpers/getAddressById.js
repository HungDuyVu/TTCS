const AddressDelivery = require("../models/addressModel");

const getAddressById = async(req, res) => {
  try {
    const addressId = req.body?.addressId;
    const address = await AddressDelivery.findById(addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Address not found"
      });
    } else {
      res.json({
        success: true,
        error: false,
        data: address
      });
    }
  } catch (error) {
    console.error("Error while fetching address by ID user:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error"
    });
  }
};

module.exports = getAddressById;

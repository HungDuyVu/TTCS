const userModel = require('../models/userModel');

const uploadProductPermission = async (userId) => {
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        
        if (user.role === 'ADMIN') {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error in permission check:", error);
        return false;
    }
};

module.exports = uploadProductPermission;

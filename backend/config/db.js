const mongoose = require("mongoose")

// TMDT-NHOM7:mongodb-tmdt-nhom7
async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://TMDT-NHOM7:mongodb-tmdt-nhom7@tmdt-nhom7.5dpxvgh.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=TMDT-NHOM7")
        // console.log("Connect to DB successfully");
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB
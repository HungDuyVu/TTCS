const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const deleteProduct = require('../controller/product/deleteProduct')
const UploadSupplierController = require('../controller/supplier/uploadSupplier')
const getSupplierController = require('../controller/supplier/getSupplier')
const uploadImportOrder = require('../controller/importOrder/uploadImportOrder')
const getImportOrder = require('../controller/importOrder/getImportOrder')
const getProductsBySupplier = require('../controller/importOrder/getProductBySupplier')
const getProductById = require('../helpers/getProductById')
const deleteImportOrder = require('../controller/importOrder/deleteImportOrder')
const checkPasswordImportOrder = require('../controller/importOrder/checkPasswordImportOrder ')
const updateImportOrder = require('../controller/importOrder/updateImportOrder')
const getImportOrderById = require('../helpers/getImportOrderById')
const uploadWarehouse = require('../controller/warehouse/uploadWarehouse')
const getWarehouse = require('../controller/warehouse/getWarehouse')
const getSupplierById = require('../helpers/getSupplierById')
const changePasswordController = require('../controller/user/changePassword')
const UploadAddress = require('../controller/address/uploadAddress')
const getAddress = require('../controller/address/getAddress')
const getAddressById = require('../helpers/getAddressById')
const deleteAddress = require('../controller/address/deleteAddress')
const updateAddress = require('../controller/address/updateAddress')
const updateSupplier = require('../controller/supplier/updateSupplier')
const deleteSupplier = require('../controller/supplier/deleteSupplier')
const updateWarehouse = require('../controller/warehouse/UpdateWarehouse')
const createOrder = require('../controller/pay/createOrder')
const paymentOnline = require('../controller/pay/paymentOnline')

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)
router.post("/change-password", authToken, changePasswordController)

// Address
router.post('/upload-address-delivery', authToken, UploadAddress)
router.get('/get-address-delivery', authToken, getAddress)
router.post('/delete-address-delivery', authToken, deleteAddress)
router.post("/update-address-delivery", authToken, updateAddress)

router.post('/get-product-by-id/', authToken, getProductById);
router.post('/get-importOrder-by-id', authToken, getImportOrderById)
router.post('/get-supplier-by-id', getSupplierById)
router.post('/get-address-by-id', authToken, getAddressById)

//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)
router.post('/delete-product', authToken, deleteProduct)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

// Supplier
router.post("/upload-supplier",authToken,UploadSupplierController)
router.get("/get-supplier", authToken,getSupplierController);
router.post("/update-supplier",authToken, updateSupplier);
router.post("/delete-supplier",authToken, deleteSupplier);

// Import Order
router.post("/upload-importOrder",authToken,uploadImportOrder)
router.get('/get-importOrder', authToken,getImportOrder)
router.post('/get-products-by-supplier', authToken, getProductsBySupplier)
router.post('/delete-importOrder', deleteImportOrder)
router.post('/check-password-import-order', checkPasswordImportOrder)
router.post('/update-importOrder', updateImportOrder)

// warehouse
router.post('/upload-warehouse', authToken, uploadWarehouse)
router.get('/get-warehouse', authToken, getWarehouse)
router.post('/update-warehouse', authToken, updateWarehouse)

// Payment
router.post('/create-order', authToken, createOrder)
router.post('/payment-online', authToken, paymentOnline)




module.exports = router
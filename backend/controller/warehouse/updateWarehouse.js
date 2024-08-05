const Warehouse = require('../../models/warehouseModel');
const Product = require('../../models/productModel');
const ImportOrder = require('../../models/importOrderModel');

const updateWarehouse = async (req, res) => {
    const { id, warehouseName, warehousePhoneNumber, warehouseAddress, products } = req.body;

    try {
        // Kiểm tra xem warehouse có tồn tại không
        const warehouse = await Warehouse.findById(id);
        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }

        // Cập nhật thông tin của warehouse
        warehouse.warehouseName = warehouseName || warehouse.warehouseName;
        warehouse.warehousePhoneNumber = warehousePhoneNumber || warehouse.warehousePhoneNumber;
        warehouse.warehouseAddress = warehouseAddress || warehouse.warehouseAddress;

        // Cập nhật số lượng sản phẩm trong warehouse
        if (products && products.length > 0) {
            const productIds = products.map(prod => prod.product);
            const existingProducts = await Product.find({ '_id': { $in: productIds } });

            const updatedProducts = await Promise.all(products.map(async (prod) => {
                const existingProduct = existingProducts.find(p => p._id.equals(prod.product));
                if (!existingProduct) {
                    throw new Error(`Product with ID ${prod.product} not found`);
                }
                existingProduct.quantity = prod.quantity;
                await existingProduct.save();
                return {
                    product: existingProduct._id,
                    quantity: prod.quantity
                };
            }));
            warehouse.products = updatedProducts;
        }

        // Lưu các thay đổi vào warehouse
        await warehouse.save();

        res.json({ message: 'Warehouse updated successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = updateWarehouse;

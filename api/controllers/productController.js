const Product = require('../models/products')


// get all products
const getAllProducts = async (req, res) => {
    try {
        const category = req.query.category
        if (category === 'all') {
            const products = await Product.find({})
            res.status(200).json(products)
        }
        else {
            const products = await Product.find({ category: category })
            res.status(200).json(products)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get singel product
const singelProductItem = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await Product.findById(productId);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//  delete product
const deleteProduct = async (req, res) => {
    try {
        await Product.deleteOne({ _id: req.params.id })
        res.status(200).json({
            status: true,
            message: "Job deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    getAllProducts, singelProductItem, deleteProduct
}
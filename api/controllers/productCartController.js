const ProductCarts = require("../models/productCart")

// get productCart using email
const getProductCartByEmail = async (req, res) => {
    try {
        const email = req.query.email
        const query = { email: email }
        const result = await ProductCarts.find(query).exec()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// post  a cart when user click add-to-cart button
const addtoCart = async (req, res) => {
    const { productItemId, name, weight, company, image, price, quantity, email } = req.body
    try {
        // existing product item
        const existingProductItem = await ProductCarts.findOne({ productItemId })
        if (existingProductItem) {
            return res.status(400).json({ message: "Product alredy exist alredy on the cart" })
        }
        const productItem = await ProductCarts.create({
            productItemId, name, weight, company, image, price, quantity, email
        })
        res.status(201).json(productItem)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getProductCartByEmail,
    addtoCart 
}
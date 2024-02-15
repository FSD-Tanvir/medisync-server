const ProductCarts = require("../models/productCart")

// get productCart using email
const getProductCartByEmail = async (req, res) => {
    try {
        const email = req.query.email
        const query = { email: email }
        const result = await ProductCarts.find(query).exec()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// post  a cart when user click add-to-cart button
const addtoCart = async (req, res) => {
    const { productItemId,quintity, name, weight, company, image, price,totalPrice, email } = req.body
    try {
        // existing product item
        const existingProductItem = await ProductCarts.findOne({ email,productItemId })
        if (existingProductItem) {
            return res.status(400).json({ message: "Product alredy exist alredy on the cart" })
        }
        const productItem = await ProductCarts.create({
            productItemId,quintity, name, weight, company, image, price,totalPrice, email
        })
        res.status(201).json(productItem)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// delete a productCart Item by user

const deleteProduct = async (req, res) => {
    const cartId = req.params.id
    try {
        const deleteCart = await ProductCarts.findByIdAndDelete(cartId)
        if (!deleteCart) {
            return res.status(401).json({ message: "Cart item notfound" })
        }
        res.status(200).json({ message: "Cart Item Delted Suceesfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getProductCartByEmail,
    addtoCart,
    deleteProduct
}
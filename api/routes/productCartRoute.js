const express = require('express')
const router = express.Router()
const productCartController = require('../controllers/productCartController')

// get product by email
router.get('/', productCartController.getProductCartByEmail)

// post product by user 
router.post('/', productCartController.addtoCart)

// delete cart by user
router.delete('/:id', productCartController.deleteProduct)

module.exports = router
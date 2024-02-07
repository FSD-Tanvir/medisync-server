const express = require('express')
const router = express.Router()
const productCartController = require('../controllers/productCartController')

// get product by email
router.get('/', productCartController.getProductCartByEmail)

// post product by user 
router.get('/',productCartController.addtoCart)
module.exports = router
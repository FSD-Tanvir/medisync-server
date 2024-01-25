const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productController')

// get all products item

router.get('/',productsController.getAllProducts)


module.exports = router;
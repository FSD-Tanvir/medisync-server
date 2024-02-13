const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productController')

// get all products item

router.get('/',productsController.getAllProducts)

router.get("/:id", productsController.singelProductItem);


module.exports = router;
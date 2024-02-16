const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productController')

// get all products item
router.get('/',productsController.getAllProducts)

// get singel product item
router.get("/:id", productsController.singelProductItem);

// post a new product
router.post("/",productsController.addToProduct)

// update single product
router.put("/update-product/:id",productsController.updateSingleProduct)

// delete singel product item
router.delete("/:id",productsController.deleteProduct)


module.exports = router;
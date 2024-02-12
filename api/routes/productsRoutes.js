const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productController')

// get all products item

router.get('/',productsController.getAllProducts)
// get singel product item
router.get("/:id", productsController.singelProductItem);
// delete singel product item
router.delete("/:id",productsController.deleteProduct)


module.exports = router;
const express = require('express')
const router = express.Router()
const productsControler = require('../controlers/productControler')

// get all products item

router.get('/',productsControler.getAllProducts)


module.exports = router;
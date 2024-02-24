const express = require('express')
const router = express.Router()
const sslCommerzController= require('../controllers/sslCommerzController')

// post route
router.post('/order',sslCommerzController.postPaymet)

module.exports = router ;
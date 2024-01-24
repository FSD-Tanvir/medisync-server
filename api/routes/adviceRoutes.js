const express = require('express')
const router = express.Router()
// const adviceController = require('../controllers/adviceController')
const { getAllAdvices } = require("../controllers/adviceController")


router.get('/', getAllAdvices);

module.exports = router;
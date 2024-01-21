const express = require('express')
const router = express.Router()
const userControler = require('../controlers/userControler')


router.get('/',  userControler.getAllUsers)

module.exports = router
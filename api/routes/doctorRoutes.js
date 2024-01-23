const express = require('express')
const router = express.Router()
const doctorControler = require('../controllers/doctorController')

// get all doctors item

router.get('/',doctorControler.getAllDoctors)


module.exports = router;
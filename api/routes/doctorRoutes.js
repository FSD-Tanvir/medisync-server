const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctorController')

// get all doctors item

router.get('/',doctorController.getAllDoctors)
router.get('/:id',doctorController.getSingleDoctor)
router.post('/',doctorController.postDoctor)
router.put('/:id',doctorController.updateDoctor)
router.delete('/:id',doctorController.deleteDoctor)


module.exports = router;
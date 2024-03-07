const express = require('express')
const router = express.Router()
// const adviceController = require('../controllers/adviceController')
const { getAllAdvices, addAnAdvice, deleteAdvice, updateAdvice } = require("../controllers/adviceController")


router.get('/', getAllAdvices);
router.post('/', addAnAdvice );
router.delete('/advices/deleteAdvice/:id', deleteAdvice);
router.patch('/advices/updateAdvice/:id', updateAdvice )
module.exports = router;
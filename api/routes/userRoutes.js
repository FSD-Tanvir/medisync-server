const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')



router.get('/all',  userController.getAllUsers)
router.get('/single-user/:email',  userController.getSingleUser)
router.post('/create-user/:email', userController.postUser)
router.put('/update-user/:email', userController.updateUser)
// router.get('/check-role/:email', userController.checkRole)

// delete many 
// router.delete('/deleteAll', userController.deleteAllUsers)

module.exports = router;
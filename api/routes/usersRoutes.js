const express = require("express");
const router = express.Router();
const {getAllUsers, makeAdmin} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.patch("/users/make-admin/:id", makeAdmin)

module.exports = router;
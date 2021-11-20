const users = require('../controllers/userController.js');
var router = require("express").Router();

router.post("/login", users.logIn)
router.post("/register", users.registerUser)

module.exports = router
const express = require("express");
const { signupValidation, loginValidation } = require("../middleware/authValidation");
const { signup, login } = require("../controller/authController");
const ensureAuthenticated = require("../middleware/auth");
const router = express.Router();
const { getPasswords, addPassword, deletepassword } = require('../controller/password');


router.get('/passwords',ensureAuthenticated, getPasswords);
router.post('/passwords',ensureAuthenticated, addPassword);
router.delete('/passwords/:id',ensureAuthenticated, deletepassword);
router.post('/signup',signupValidation,signup)

router.post('/login',loginValidation,login)


module.exports = router;
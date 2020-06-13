const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../../middlewear/authMiddleware');
const authController = require('../controller/authController')


signupValidator = [check('name','Name is Required').not().isEmpty(),
                   check('email','Please include a valid email').isEmail(),
                   check('password','Please enter a password with 6 or more characters').isLength({min:6})];

loginValidator = [check('email','Please include the valid email').isEmail(),
                  check('password','Please enter the password').exists()]


router.get ('/',authMiddleware,authController.getUserData);
router.post('/login', loginValidator, authController.loginWithPassword);
router.post('/signup',signupValidator,authController.signUpWithPassword);
router.delete('/:user_id',authController.deleteUser); // no token ?


module.exports = router; 
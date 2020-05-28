const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../../middlewear/authMiddleware');
const authController = require('../controller/authController')

router.get('/', authMiddleware, authController.getUserData);
router.post('/',[ check('email','Please include the valid email').isEmail(),
                  check('password','Please enter the password').exists()] // express validator
               ,authController.loginWithPassword);


module.exports = router; 
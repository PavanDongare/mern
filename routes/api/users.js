const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const userController = require('../controller/userController')


validatorSignUpWithPassword = [check('name','Name is Required')
            .not()
            .isEmpty(),
            check('email','Please include a valid email').isEmail(),
            check('password','Please enter a password with 6 or more characters').isLength({min:6})
            ]

router.post('/', validatorSignUpWithPassword,userController.signUpWithPassword);

module.exports = router;
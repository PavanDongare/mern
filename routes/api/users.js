const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const { check } = require('express-validator');


validator = [check('name','Name is Required')
            .not()
            .isEmpty(),
            check('email','Please include a valid email').isEmail(),
            check('password','Please enter a password with 6 or more characters').isLength({min:6})
            ];

router.post('/signup',validator,userController.signUpWithPassword);

module.exports = router;
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


// api/users
// test   route
// access public
router.post('/',
    [check('name','Name is Required')
        .not()
        .isEmpty(),
     check('email','Please include a valid email').isEmail(),
     check('password','Please enter a password with 6 or more characters').isLength({min:6})
    ]
,(req,res)=>
   {
       const errors= validationResult(req);
       if(errors.isEmpty()){
            return res.status(200).json('success');
       }else {
        return res.status(400).json({errors: errors.array()});
       }
       res.send('user route')
   }

);

module.exports = router;
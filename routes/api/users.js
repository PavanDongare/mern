const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const pool = require('../../dbConnection');// ./ is next ../ is back




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
   ,async (req,res)=>
   {
       const errors= validationResult(req);
       if(errors.isEmpty()){
            return res.status(200).json('success');
       }else {
        

        const { name,email,passsword } = req.body;

        try {
             // check if user exists
     
             // check gravatar
             const avatar = gravatar.url(email,{s:200,r:'pg',d:'mm'});

             user =  new User({

             })
     
             // encrypt password: we get this in text?
             const salt = await bcrypt.genSalt(10);
             user.passsword = await bcrypt.hash(passsword,salt);

             pool.query('INSERT into user (email,name,password,avatar) values()', (error, result) => {
                if (error) res.send(error);
                res.send(result);
            });
            // name


             // return jsonwebtoken
        } catch(err) {
            return res.status(400).json({errors: errors.array()});
        }

       
       }
       res.send('user route')
   }

);

module.exports = router;
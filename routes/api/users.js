const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const pool = require('../../dbConnection');// ./ is next ../ is back
const jwt = require('jsonwebtoken');
const config = require('config');




// api/users
// test   route
// access public

 //pool.query(`INSERT into user (email,name,password,avatar) values(${email},${name},${passsword},${avatar})`, (error, result) => {
                       //INSERT into user (email,name,password,avatar) values('1','2','123456','aa');

router.post('/',
    [check('name','Name is Required')
        .not()
        .isEmpty(),
     check('email','Please include a valid email').isEmail(),
     check('password','Please enter a password with 6 or more characters').isLength({min:6})
    ]
   ,async (req,res)=>
   {    
       const errors = validationResult(req);
       if(!errors.isEmpty()){
           return res.status(400).json({errors: errors});
       }

       const {name,email,password} = req.body
       const avatar = gravatar.url(email,{s:200,r:'pg',d:'mm'});
       
       const salt =  await bcrypt.genSalt(10);
       pwd   = await bcrypt.hash(password,salt);
       console.log(pwd);

       //return res.status(200).json(name);
       try {
           pool.query(`INSERT into user (email,name,password,avatar) 
                                  values('${email}','${name}','${pwd}','${avatar}' ); `, (error, result) => {
               if (error) 
                    res.send(error); 
               else {
                   //res.send(result);
                   const payload = {
                       user: {
                           id : email
                       }
                   }
                   jwt.sign(payload,
                            config.get('jwtSecret'),
                            {expiresIn:36000},
                            (err,token)=>{
                                if(err) throw err;
                                res.json({token});
                            });
               }  
                    
           });
       } catch(err){
           console.log(err);
           res.status(500).send('server error');
       }
   }

);

module.exports = router;
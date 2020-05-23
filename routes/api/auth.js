const express = require('express');
const router = express.Router();


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');



const auth = require('../../middlewear/auth');
const pool = require('../../dbConnection');// ./ is next ../ is back

// jwt login
// auth jwt middleware checks if token is present , passes the request with adding user data to req object
// so req has a 'user' property added by jwt auth middleware
router.get('/',auth,(req,res)=>{ 
    pool.query(`select * from user where email = '${req.user.id}'`,
              (err,result)=>{
                  if(err)
                    res.status(400).json(err);
                  else{
                    let userData = result[0];
                    delete userData['password'];
                    res.status(200).json(userData);
                  } 
              });
    } 
);

// post login
router.post('/',
    [
     check('email','Please include the valid email').isEmail(),
     check('password','Please enter the password').exists() // express validator
    ]
   ,async (req,res)=>
   {    
       const errors = validationResult(req);
       if(!errors.isEmpty()){
           return res.status(400).json({errors: errors});
       }

       const {email,password} = req.body // extracts from request

       
       const salt =  await bcrypt.genSalt(10);
       pwd   = await bcrypt.hash(password,salt);
       console.log(pwd);

       //return res.status(200).json(name);
       try {
           pool.query(`select * from user where email = '${email}'`,
           async (err,result)=>{
               if(err)
                 res.status(400).json(err);
               else{
                 let userData = result[0];
                 const isMatch = await bcrypt.compare(password,userData['password']);
                 delete userData['password'];
                 if(isMatch)
                 {
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
                 else
                    res.status(400).json('wrong password');
               } 
           });

       } catch(err){
           console.log(err);
           res.status(500).send('server error');
       }
   }
);


module.exports = router; 
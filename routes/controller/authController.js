const pool = require('../../dbConnection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

getUserData= (req,res)=>{ 
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



// post 
loginWithPassword = async (req,res)=>
{    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors});
    }


    const {email,password} = req.body // extracts from request
    try {
        pool.query(`select * from user where email = '${email}' `,
        async (err,sqlResult)=>{
            console.log(sqlResult);
            if(err)
              res.status(400).json(err);
            else{
              const passwordFromTable = sqlResult[0]['password'];
              const isMatch = await bcrypt.compare(password,passwordFromTable);

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

getJwt = async (err,result,req)=>{
}

module.exports = {
    getUserData,
    loginWithPassword,

};

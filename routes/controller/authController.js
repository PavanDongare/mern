const pool = require('../../dbConnection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const helperFunctions = require('./helperFunctions')


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

loginWithPassword = async (req,res)=>
{    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors});
    }
    try {
        pool.query(`select * from user where email = '${req.body.email}' `,
        async (err,sqlResult)=>{
            console.log(sqlResult);
            err? res.status(400).json(err): null ;

            const passwordFromTable = sqlResult[0]['password'];
            const isMatch = await bcrypt.compare(req.body.password,passwordFromTable);
            isMatch ? helperFunctions.sendJwt(req,res): res.status(400).json('wrong password'); 
        });
    } catch(err){
        console.log(err);
        res.status(500).send('server error');
    }
}


module.exports = {
    getUserData,
    loginWithPassword,

};

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const pool = require('../../dbConnection');// ./ is next ../ is back

const { validationResult } = require('express-validator');
const helperFunctions = require('./helperFunctions')





signUpWithPassword = async (req,res)=>
{    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors});
    }
    const salt =  await bcrypt.genSalt(10);
    const encryptedPassword   = await bcrypt.hash(req.body.password,salt);
    const avatar = gravatar.url(req.body.email,{s:200,r:'pg',d:'mm'});
  
    try {
        pool.query(`INSERT into user (email,name,password,avatar)
                                values('${req.body.email}','${req.body.name}','${encryptedPassword}','${avatar}' ); `, 
                                (error, result) => {                 
                                    error ?  res.send(error) : helperFunctions.sendJwt(req,res);  
        });
    } catch(err){
        res.status(500).send('server error'); console.log(err);
    }
}

module.exports = {
    signUpWithPassword,
};
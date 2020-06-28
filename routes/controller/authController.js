const pool = require('../../dbConnection');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
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

loginWithPassword = async (req,res)=>
{    
    helperFunctions.backendValidation(req,res);
    try {
        pool.query(`select * from user where email = '${req.body.email}' `,
        async (err,sqlResult)=>{
           
            if(sqlResult.length>=1){    
                const passwordFromTable =  sqlResult[0]['password']; 
                const isMatch =  await bcrypt.compare(req.body.password,passwordFromTable);
                isMatch ? helperFunctions.sendJwt(req,res): res.status(400).json('wrong password'); 
            } 
            else {
                throw err;
            }       
        });
    } catch(err){
        res.status(500).send('User Not found');
    }
}

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


deleteUser = async(req,res)=>{
    pool.query(` delete * FROM users where email='${ req.params.user_id}'`, 
    (err,result)=>{
        err ?  res.status(400).json(err) : 
        result.length==0 ? res.status(400).json('user not found'): res.status(200).json(result[0]);
    })
}

deleteUserByToken =()=>{
    pool.query(` delete * FROM users where email='${req.user.id}'`, 
    (err,result)=>{
        err ?  res.status(400).json(err) : 
        result.length==0 ? res.status(400).json('user not found'): res.status(200).json(result[0]);
    })
}


module.exports = {
    getUserData,
    loginWithPassword,
    signUpWithPassword,
    deleteUser
};

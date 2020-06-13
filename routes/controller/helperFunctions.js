const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const pool = require('../../dbConnection');

sendJwt = (req,res) => {
    const payload = { user: { id : req.body.email } }
    jwt.sign(payload,
             config.get('jwtSecret'),
             {expiresIn:36000},
             (err,token)=>{
                 if(err) throw err;
                 res.json({token});
             });
}


backendValidation= (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
}

sqlCallBack = (err,res,result,msg)=>{  // when sql callback is giving backend response
    err ?  res.status(400).json(err) : 
    result.length==0 ? res.status(400).json(msg): res.status(200).json(result);
}


get_info=(data, callback)=> {
   
}

    

function getDataFromDB(req,query,callback){
    pool.query(query, function(err, results){
       return err ?  err :  callback(results);
  })
}


module.exports = {
   sendJwt,
   backendValidation,
   sqlCallBack,
   getDataFromDB,
   get_info
};

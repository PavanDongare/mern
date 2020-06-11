const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

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

module.exports = {
   sendJwt,
   backendValidation
};

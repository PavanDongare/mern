const jwt = require('jsonwebtoken');
const config = require('config');

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

module.exports = {
   sendJwt
};

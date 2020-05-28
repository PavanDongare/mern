 // this middleware just decrypts token & attaches uerid to req
 
 const jwt = require('jsonwebtoken');
 const config = require('config');

 module.exports =  function(req,res,next){
    //Get token from header
    const token = req.header('x-auth-token');
    //Check if no token
    if(!token) 
        res.status(401).json({msg: 'Authorization denied'});
    // verify token
    try{
        const decoded =  jwt.verify(token,config.get('jwtSecret')); // verified
        req.user = decoded.user;  // adds a new field to req, named user
        next();// go to next function, notice 'user' added to req   
    } catch(err){// if varify fails
        res.status(401).json({msg:'Token Not Valid, login again'});
    }
 }
const express = require('express');
const router = express.Router();

const auth = require('../../middlewear/auth');
const pool = require('../../dbConnection');// ./ is next ../ is back

// api/auth
// test   route
// access public
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

module.exports = router;
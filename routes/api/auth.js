const express = require('express');
const router = express.Router();


// api/auth
// test   route
// access public
router.get('/',(req,res)=>{res.send('auth route')});

module.exports = router;
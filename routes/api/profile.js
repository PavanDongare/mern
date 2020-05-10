const express = require('express');
const router = express.Router();


// api/profiles
// test   route
// access public
router.get('/',(req,res)=>{res.send('profile route')});

module.exports = router;
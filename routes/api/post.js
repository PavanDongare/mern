const express = require('express');
const router = express.Router();


// api/post
// test   route
// access public
router.get('/',(req,res)=>{res.send('post route')});

module.exports = router;
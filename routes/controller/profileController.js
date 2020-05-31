const pool = require('../../dbConnection');
const gravatar = require('gravatar');
const { validationResult } = require('express-validator');


getProfileData = (req,res) => { 
   pool.query(`SELECT * FROM profiles WHERE email  = '${req.user.id}' LIMIT 1 `, 
       (err,result)=>{
           err ?  res.status(400).json(err) : 
           result.length==0 ? res.status(400).json('user not found'): res.status(200).json(result);
})}

createProfile = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    else {
        const {name,company,website,location} = req.body // extracts from request
        const avatar = gravatar.url(req.body.email,{s:200,r:'pg',d:'mm'});

        pool.query(`
            insert into profiles (email,name,company,website,location,avatar)
            values('${req.user.id}','${name}','${company}','${website}','${location}','${avatar}')
            ON DUPLICATE KEY UPDATE
            name = '${name}', company = '${company}', website = '${website}', location = '${location}',avatar='${avatar}'`, 
        (err,result)=>{
            err ?  res.status(400).json(err) : 
            result.length==0 ? res.status(400).json('user not found'): res.status(200).json(result);
        })
    }
}

getAllProfiles=(req,res)=>{
   // return name, avatar
   pool.query(` SELECT name,avatar FROM profiles`, 
        (err,result)=>{
            err ?  res.status(400).json(err) : 
            result.length==0 ? res.status(400).json('user not found'): res.status(200).json(result);
        })
}

module.exports = {
    getProfileData,
    createProfile,
    getAllProfiles
};
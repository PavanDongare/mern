const pool = require('../../dbConnection');
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
        pool.query(`
            insert into profiles (email,name,company,website,location)
            values('${req.user.id}','${name}','${company}','${website}','${location}')
            ON DUPLICATE KEY UPDATE
            name = '${name}', company = '${company}', website = '${website}', location = '${location}'
            `, 
        (err,result)=>{
            err ?  res.status(400).json(err) : 
            result.length==0 ? res.status(400).json('user not found'): res.status(200).json(result);
        })
    }
}

module.exports = {
    getProfileData,
    createProfile
};

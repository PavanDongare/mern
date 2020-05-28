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
        pool.query(`INSERT into profiles (email,name,company,website,location)
                    values('${req.user.id}','${name}','${company}','${website}','${location}')`, 
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


/*

IF EXISTS (SELECT * FROM [profiles] WHERE ID = req.user.id)
UPDATE [profiles] SET 
    name = '${name}',
    company = '${company}',
    website = '${website}'
    location = '${location}'
ELSE
INSERT INTO [profiles] (email,name,company,website,location) values('${req.user.id}','${name}','${company}','${website},'${location}')
 */

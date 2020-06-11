const pool = require('../../dbConnection');
const gravatar = require('gravatar');
const { validationResult } = require('express-validator');
const helperFunctions = require('./helperFunctions')



getProfileData = (req,res) => { 
   pool.query(`SELECT * FROM profiles WHERE email  = '${req.user.id}' LIMIT 1 `, 
       (err,result)=>{
           err ?  res.status(400).json(err) : 
           result.length==0 ? res.status(400).json('user not found'): res.status(200).json(result);
})}

createProfile = async (req,res)=>{
    helperFunctions.backendValidation(req,res);
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

getAllProfiles=(req,res)=>{
   // return name, avatar
   pool.query(` SELECT * FROM profiles`, 
        (err,result)=>{
            err ?  res.status(400).json(err) : 
            result.length==0 ? res.status(400).json('user not found'): res.status(200).json(result);
        })
}

getProfileById=(req,res)=>{
    pool.query(` SELECT * FROM profiles where email='${ req.params.user_id}'`, 
    (err,result)=>{
        err ?  res.status(400).json(err) : 
        result.length==0 ? res.status(400).json('user not found'): res.status(200).json(result[0]);
    })
}

addExperience=(req,res)=>{

}




module.exports = {
    getProfileData,
    createProfile,
    getAllProfiles,
    getProfileById,
    addExperience
};

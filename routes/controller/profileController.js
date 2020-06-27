const pool = require('../../dbConnection');
const gravatar = require('gravatar');
const { validationResult } = require('express-validator');
const helperFunctions = require('./helperFunctions')



getProfileData = (req,res) => { 
   pool.query(`SELECT * FROM profiles WHERE email  = '${req.user.id}' LIMIT 1 `, 
       (err,result)=>{
           err ?  res.status(400).json(err) : 
           result.length==0 && res.status(400).json('user not found');
           let profileData  = JSON.parse(result[0].profileData); 
           let userData = { 
                            "profile_id" : result[0].profile_id, 
                            "email": result[0].email,
                            ...profileData };
           
           res.status(200).json(userData);

})}

createProfile = async (req,res)=>{
    dataValidation = helperFunctions.backendValidation(req,res);
    if(!dataValidation)
       return ;
    console.log(req.body);
    const avatar = gravatar.url(req.body.email,{s:200,r:'pg',d:'mm'});
    pool.query(`
        insert into profiles (email,profileData)
        values('${req.user.id}','${JSON.stringify(req.body)}')
        ON DUPLICATE KEY UPDATE
        profileData = '${JSON.stringify(req.body)}'  `, 
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
            result.length==0 ? res.status(400).json('No users found'): res.status(200).json(result);
        })
}

getProfileById=(req,res)=>{
    pool.query(` SELECT * FROM profiles where email='${ req.params.user_id}'`, 
    (err,result)=>{
        err ?  res.status(400).json(err) : 
        result.length==0 ? res.status(400).json('user not found'): res.status(200).json(result[0]);
    })
}

getProfileId=(req,res)=>{
    pool.query(` SELECT profile_id FROM profiles where email='${ req.params.user_id}'`, 
    (err,result)=>{
        err ?  res.status(400).json(err) : 
        result.length==0 ? res.status(400).json('user not found'): res.status(200).json(result[0]);
    })
}

addExperience=(req,res)=>{
    helperFunctions.backendValidation(req,res);
    const {location,title,company,date_to,date_from} = req.body

    sql_query = (date_to && date_from) ? 
                `Insert into Experience (profile_id,location,title,company,date_to,date_from)
                SELECT Profiles.profile_id ,'${location}','${title}','${company}','${date_to}','${date_from}'
                FROM Profiles 
                WHERE Profiles.email = '${req.user.id}'` 
                :
                `Insert into Experience (profile_id,location,title,company)
                SELECT Profiles.profile_id ,'${location}','${title}','${company}'
                FROM Profiles 
                WHERE Profiles.email = '${req.user.id}'`;

    pool.query(sql_query,
        (err,result)=>{
        err ?  res.status(400).json(err) : 
        result.length==0 ? res.status(400).json('Experience could not be added'): res.status(200).json(result);
    })
}


deleteExperience=(req,res)=>{
    pool.query(`DELETE FROM Experience WHERE Experience.experience_id = ${ req.params.experience_id}`   ,
        (err,result)=>{
        err ?  res.status(400).json(err) : 
        result.length==0 ? res.status(400).json('delete failed'): res.status(200).json(result);
    })
}






module.exports = {
    getProfileData,
    createProfile,
    getAllProfiles,
    getProfileById,
    addExperience,
    deleteExperience
};

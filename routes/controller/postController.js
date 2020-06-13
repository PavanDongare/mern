const pool = require('../../dbConnection');
const gravatar = require('gravatar');
const { validationResult } = require('express-validator');
const helperFunctions = require('./helperFunctions')

getAllPosts=(req,res)=>{
    pool.query(` SELECT * FROM Posts`, 
         (err,result)=>{
             err ?  res.status(400).json(err) : 
             result.length==0 ? res.status(400).json('No posts found'): res.status(200).json(result);
         })
}

addPost=(req,res)=>{
    const {caption,text} = req.body

    addPostQuery = `Insert into Posts (profile_id,caption,text)
           SELECT Profiles.profile_id ,'${caption}','${text}'
           FROM Profiles 
           WHERE Profiles.email = '${req.user.id}'`

    pool.query(addPostQuery, 
    (err,result)=>{
        err ?  res.status(400).json(err) : 
        result.length==0 ? res.status(400).json('Something went wrong,post not created'): res.status(200).json(addPostQuery);
    })
}




deletePost=(req,res)=>{
    getProfileId = `SELECT Profiles.profile_id  FROM Profiles  WHERE Profiles.email = '${req.user.id}' `   
    var profileId = 0;

    helperFunctions.getDataFromDB(req,getProfileId,function(result){
        profileId = result[0].profile_id;
        deletePost = `delete from Posts 
                      where post_id=${req.params.postId} AND
                      profile_id=${profileId}
                      `
        console.log(deletePost);
        pool.query(deletePost,(err,result)=>
        {
            helperFunctions.sqlCallBack(err,res,result,'delete failed')
        });
    })
}
like=(req,res)=>{
    getProfileId = `SELECT Profiles.profile_id  FROM Profiles  WHERE Profiles.email = '${req.user.id}' `   
    var profileId = 0;
    helperFunctions.getDataFromDB(req,getProfileId,function(result){
        profileId = result[0].profile_id;
        likeQuery = `insert into likes (post_id,profile_id) values(${req.params.postId},${profileId})`
        pool.query(likeQuery,(err,result)=>
        {
            if(err){
                pool.query(`delete from likes where post_id=${req.params.postId} and profile_id=${profileId}`);
                res.status(200).json('Unlinked the post');
            }
            helperFunctions.sqlCallBack(err,res,result,'like failed')
        });
    })
}







module.exports = {
    getAllPosts,
    addPost,
    deletePost,
    like
};
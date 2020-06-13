const express = require('express');
const router = express.Router();
const authMiddleWare = require('../../middlewear/authMiddleware');
const postController = require('../controller/postController')
const pool = require('../../dbConnection');// ./ is next ../ is back
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');




router.get('/',postController.getAllPosts);
router.post('/',authMiddleWare,postController.addPost);
router.delete('/:postId',authMiddleWare,postController.deletePost)
router.post('/:postId',authMiddleWare,postController.like);

router.post('/comment/:postId',authMiddleWare,postController.addComment);
router.delete('/comment/:commentId',authMiddleWare,postController.deleteComment);



module.exports = router;
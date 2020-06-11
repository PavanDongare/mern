const express = require('express');
const router = express.Router();
const authMiddleWare = require('../../middlewear/authMiddleware');
const profileController = require('../controller/profileController')
const pool = require('../../dbConnection');// ./ is next ../ is back

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');


validatorGetProfile = [check('name','screen name is required ').not().isEmpty(),]


router.get('/' , authMiddleWare, profileController.getProfileData); // single profile by token
router.post('/', authMiddleWare, validatorGetProfile,profileController.createProfile)

router.get('/all',profileController.getAllProfiles);
router.get('/:user_id',profileController.getProfileById);




module.exports = router;


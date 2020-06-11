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


experienceDataValidator = [check('title','Title is Required').not().isEmpty(),
                           check('company','Company name is Required').not().isEmpty(),
                           check('date_from','starting date missing').not().isEmpty(),
                           check('date_to','Ending date missing').not().isEmpty(),
                           ];


router.get('/' , authMiddleWare, profileController.getProfileData); // single profile by token
router.post('/', authMiddleWare, validatorGetProfile,profileController.createProfile)

router.get('/all',profileController.getAllProfiles);
router.get('/:user_id',profileController.getProfileById);

router.post('/experience',profileController.addExperience);




module.exports = router;


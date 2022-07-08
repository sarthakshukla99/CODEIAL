const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport') 
// console.log('*****route index has started ***');

router.get('/',homeController.home);

router.use('/users', require('./users'))

router.use('/practice',require('./practice'));
module.exports = router
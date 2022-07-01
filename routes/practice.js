const express = require('express');
const router = express.Router();

const practiceController = require('../controllers/practice_controller');

router.get('/practice',practiceController.practice);


module.exports = router
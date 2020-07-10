const express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');
// var bcrypt = require('bcrypt');
// var jwt  = require('jsonwebtoken');




// login
router.post('/login',authController.login);   

//create new user
router.post('/',authController.createUser); 
   




module.exports = router;
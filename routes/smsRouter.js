const express = require('express');
var router = express.Router();
var smsController = require('../controllers/smsController');
;

router.post('/send',smsController.sendSms); 
router.get('/send',smsController.getMessages);   


   




module.exports = router;
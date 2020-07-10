const express = require('express');
var router = express.Router();
const groupController = require('../controllers/groupController')


router.post('/',groupController.create);
router.get('/',groupController.findAll);

router.get('/:id',groupController.findOne)
router.put('/:id',groupController.update);

router.delete('/:id',groupController.delete);

router.post('/contact-group',groupController.addToGroup);
router.get('/all/group',groupController.getAllGroup);
router.get('/contact-group/:id',groupController.findGoupUsersWithGroup);

module.exports = router;
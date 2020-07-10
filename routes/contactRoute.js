const express = require('express');
var router = express.Router();
const contactController = require('../controllers/contactController');
var isAuthenticated = require('../middlewares/checkAuth');



router.post('/',contactController.create);
// router.get('/',isAuthenticated,contactController.findAll);
router.get('/',contactController.findAll);


router.get('/:phoneNumber',contactController.findOne)
router.put('/:id',contactController.update);

router.delete('/:id',contactController.delete);

module.exports = router;
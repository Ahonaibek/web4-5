const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
router.post('/', userController.authenticate);
router.get('/', function(req, res, next) {
    res.render('login');
});
module.exports = router;

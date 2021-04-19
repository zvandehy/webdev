const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();

// give form to create user
router.get('/new', controller.signup);
// create user
router.post('/', controller.create);
// form for login
router.get('/login', controller.login);
// authenticate login
router.post('/login', controller.authenticate);
// show profile
router.get('/profile', controller.profile);
// log user out
router.get('/logout', controller.logout);

module.exports = router;
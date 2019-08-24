const express = require('express');
const route = express.Router();
const authCtrl = require('../controllers/auth');
const bodyParser = require('body-parser');

route.use(bodyParser.urlencoded({ extended: true }));

route.get('/auth/login', authCtrl.getLogin);
route.post('/auth/login', authCtrl.postLogin);
route.get('/auth/signup', authCtrl.getSignup);
route.post('/auth/signup', authCtrl.postSignup);

// logout
route.get('/auth/logout', authCtrl.getLogout);

module.exports = route;

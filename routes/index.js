const express = require('express');
const isAuth = require('./../middleware/auth');
const route = express.Router();
const indexCtrl = require('../controllers/index');

route.get('/', indexCtrl.getIndex);

module.exports = route;

const express = require('express');
const isAuth = require('./../middleware/auth');
const route = express.Router();
const indexCtrl = require('../controllers/admin');

route.get('/admin/edit', isAuth, indexCtrl.getEdit);

module.exports = route;

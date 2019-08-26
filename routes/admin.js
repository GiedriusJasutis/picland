const express = require('express');
const isAuth = require('./../middleware/auth');
const route = express.Router();
const indexCtrl = require('../controllers/admin');
const csrf = require('csurf');
const protectCsurf = csrf();

route.use(protectCsurf);

route.get('/admin/edit', isAuth, indexCtrl.getEdit);

module.exports = route;

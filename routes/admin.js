const express = require('express');
const route = express.Router();
const indexCtrl = require('../controllers/admin');

route.get('/admin/edit', indexCtrl.getEdit);

module.exports = route;

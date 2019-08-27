const express = require('express');
const isAuth = require('./../middleware/auth');
const route = express.Router();
const adminCtrl = require('../controllers/admin');

route.get('/admin/edit', isAuth, adminCtrl.getEdit);

// get edit for updating card
route.get('/edit', adminCtrl.getEditUpdate);

// post delete card
route.post('/delete', adminCtrl.postDeleteCard);

// post new card
route.post('/add', adminCtrl.addNewCard);

module.exports = route;

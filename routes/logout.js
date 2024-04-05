const express = require('express');
const logoutRouter =  express.Router();
const userLogout = require('../controllers/logout')


logoutRouter.post('/', userLogout);

module.exports = logoutRouter;
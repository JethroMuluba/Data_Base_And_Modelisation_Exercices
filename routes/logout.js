const express = require('express');
const userLogout = require('../controllers/logout');
const logoutRouter = express.Router();

logoutRouter.post('/logout', userLogout);

module.exports = logoutRouter;
const express = require('express');
const userRegister = require('../controllers/register');

const registerRoute = express.Router();

registerRoute.post('/', userRegister);


module.exports = registerRoute;
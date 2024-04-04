const express = require('express');
const userLogin = require('../middleware/login')

const loginRouter = express.Router();


loginRouter.post('/', userLogin)


module.exports = loginRouter;  
const express = require('express');
const loginRouter = require('./routes/login');
const  app = express();
const dotenv = require('dotenv').config();

const PORT = process.env.PORT;


app.use('/login', loginRouter)










app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`)
})
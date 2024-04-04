const express = require('express');
const loginRouter = require('./routes/login');
const  app = express();
const dotenv = require('dotenv').config();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.status(200).send({message: 'Welcome to the API of Kadea Academy'});
})


app.use('/login', loginRouter)










app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`)
})
const express = require('express');
const passport = require('passport');
const  app = express();

const loginRouter = require('./routes/login');
const registerRoute = require('./routes/register');
const configPassport = require('./controllers/login');
const logoutRouter = require('./routes/logout');

//Import Dotenv
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;


//Use Passport-Local In Passport Js
passport.use(configPassport);

//Initialize Passport
app.use(passport.initialize());

app.use(express.json( ));


app.get('/', (req, res) => {
    res.status(200).send({message: 'Welcome to the API of Kadea Academy'});
})

app.use('/login', loginRouter);

app.use('/logout', logoutRouter);

app.use('/register', registerRoute);










app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`)
})
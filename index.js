const express = require('express');
const passport = require('passport');
const  app = express();
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy;
//Import Dotenv
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
// const secret = process.env.SESSION_SECRET;


//Creat Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
























app.get('/', (req, res) => {
    res.status(200).send({message: 'Welcome to the API of Kadea Academy'});
})












app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`)
})
const express = require('express');
const passport = require('passport')
const bcrypt = require('bcrypt');

//Import Data Basee
const prisma = require('./db/prisma');

//Import The Local Strategy
const LocalStrategy = require('passport-local').Strategy;


const loginRouter = require('./routes/login');
const registerRoute = require('./routes/register');
const  app = express();

//Import Dotenv
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;

//Setting the Local Strategy To Authenticate  User With Usernme And Password
const configPassport = new LocalStrategy(
    {
    usernameField: "email",
    passwordField: "password"
    }, async (email, password, done) => {
        const user = await prisma.user.findUnique({
            where : {email}
        });
        if (!user) {
            return done(null, false, {message:"No User Found!"});
        }
        //Hash Password With Bcrypt
        bcrypt.compare(password, user.password, ( error, isMatch) => {
            if ( error ) {
                return done(error);
            }
            if ( !isMatch ) {
                return done( null, false, {message: 'Password Not Correct'})
                
            }
            return done(null, user)
        })
    }
);

//Use Passport-Local In Passport Js
passport.use(configPassport);

//Serialize & Deserialize Users
passport.serializeUser((user, done) => {
    done( null, user.id);
})

passport.deserializeUser((user, done) => {
    done(null, user);
});

//Initialize Passport
app.use(passport.initialize());

app.use(express.json( ));


app.get('/', (req, res) => {
    res.status(200).send({message: 'Welcome to the API of Kadea Academy'});
})


app.use('/login', loginRouter);

app.use('/register', registerRoute);










app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`)
})
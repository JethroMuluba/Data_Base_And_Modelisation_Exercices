const express = require('express');
const passport = require('passport');
const  app = express();
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy;
const prisma = require('./db/prisma');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const userRegister = require('./controllers/register');
const generateToken = require('./middleware/token');
const logoutRouter = require('./routes/logout');


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
app.use(express.json())

//Config Passport local strategy
passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField:'password' },
    async (email, password, done) => {
        try {
            const user = await prisma.user.findFirst({
                where:{ email }
            });

            if (!user) {
                return done(null, false, { message: 'Email incorrect' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Mot de passe incorrect' });
            } 
        } catch (err) {
            return done(err);
        }

    }
));

//Config serialize  and deserialize user 
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {id}
        });
        done(null, user);
    } catch (err) {
        done(err);
    }
});

//Set Authenticate Route
app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboar',
    failureRedirect: '/login',
    failureFlash: true,
}), generateToken
);

app.post('/logout', logoutRouter);


app.get('/', (req, res) => {
    res.status(200).send({message: 'Welcome to the API of Kadea Academy'});
})

app.post('/', (req, res) => {
    res.status(200).send({message: 'Welcome to the API of Kadea Academy'});
})

app.use('/register', userRegister );

app.post('/dashboar', (req, res) => {
    res.status(200).send({message: 'Welcome To Your Dashboard'});
})








app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`)
})
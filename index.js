const express = require('express');
const passport = require('passport');
const  app = express();
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy;
const prisma = require('./db/prisma');
const bcrypt = require('bcrypt')
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

//Config ure Passport local strategy
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
    failureFlash: true
}));

app.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Erreur lors de la déconnexion :', err);
            return res.redirect('/');
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Erreur lors de la destruction de la session :', err);
            }
            res.redirect('/');
        });
    });
});


//Genere and Check Json  Web Token
const jwt = require('jsonwebtoken');
const userRegister = require('./controllers/register');

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.SESSION_SECRET, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token non fourni' });
    }

    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }

        req.user = decoded;
        next();
    });
};



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
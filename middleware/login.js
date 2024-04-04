const passport = require('passport');
const jwt = require('jsonwebtoken');


const userLogin = (rep, res, next) => {
    passport.authenticate('local', (error, user, info) => {

    })
}




module.exports = userLogin;
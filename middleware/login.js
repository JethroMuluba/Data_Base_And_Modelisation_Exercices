const passport = require('passport');
const jwt = require('jsonwebtoken');


const userLogin = (rep, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if ( error ) {
            return next( err );
        }

        if ( !user ) {
            res.status(401).json({message: "User didn't Authenticate"});
        }

        const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: Date.now + 3 * 60 * 1000},

        );
        res.status(200).json(token);
    }) (req, res, next);
}




module.exports = userLogin;
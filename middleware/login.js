const passport = require('passport');
const jwt = require('jsonwebtoken');


const userLogin = (req, res, next) => {
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
            {expiresIn: "1d"},
        );
        // Sending back the token and id of authenticated user
        res.status(300).redirect('/');
    }) (req, res, next);
}




module.exports = userLogin;
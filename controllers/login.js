// const passport = require('passport');
// const bcrypt = require('bcrypt');
// const prisma = require('../db/prisma');
// const LocalStrategy = require('passport-local').Strategy;


// //Setting the Local Strategy To Authenticate  User With Usernme And Password
// const configPassport = new LocalStrategy(
//     {
//     usernameField: "email",
//     passwordField: "password"
//     }, async (email, password, done) => {
//         const user = await prisma.user.findFirst({
//             where : {email}
//         });
//         if (!user) {
//             return done(null, false, {message:"No User Found!"});
//         }
//         //Hash Password With Bcrypt
//         bcrypt.compare(password, user.password, ( error, isMatch) => {
//             if ( error ) {
//                 return done(error);
//             }
//             if ( !isMatch ) {
//                 return done( null, false, {message: 'Password Not Correct'})
                
//             }
//             return done(null, user)
//         })
//     }
// );

// //Serialize & Deserialize Users
// passport.serializeUser((user, done) => {
//     done( null, user.id);
// })

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });


// module.exports = configPassport;
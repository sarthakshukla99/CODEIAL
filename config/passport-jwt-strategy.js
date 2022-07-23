const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT =  require('passport-jwt').ExtractJwt;


const User = require('../models/user');


let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken,

    secretOrKey : 'codeial',
}


passport.use(new JWTStrategy(opts, function(jwtPayload, done){

    User.findById(jwtPayload._id, function(err,user){
        if(err){
            console.log('error in finding user from JWT');
            return
        }

        if(user){
            return done(null, user);
        }
        else{
            return done(null, false)
        }
    })


}));

//====================================================================================


// var JwtStrategy = require('passport-jwt').Strategy;

// var ExtractJwt = require('passport-jwt').ExtractJwt;

// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';

// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({id: jwt_payload.sub}, function(err, user) {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//             // or you could create a new account
//         }
//     });
// }));




module.exports = passport;
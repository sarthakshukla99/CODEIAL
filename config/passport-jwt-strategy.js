const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
//module to extract jwt from the header
const ExtractJWT =  require('passport-jwt').ExtractJwt;

// whenever we are establishing the identity of the user we need to import user model for AUTHENTICATION    
const User = require('../models/user');


let opts = {
    //header has a list of keys and bearer has the jwt token
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial',  // enc and decryption key
}



// Here User is already there in the jwt, we are just fetching out the id from the payload and checking if the user is there or not
// 
passport.use(new JWTStrategy(opts, function(jwtPayload, done){
// this cb func read the information from the payload..Payload has all the info of the user
// i m going to be storing the complete user's info in payload info over here(enc)
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


module.exports = passport;
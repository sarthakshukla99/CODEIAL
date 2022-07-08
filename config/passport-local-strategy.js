const passport = require('passport');

// console.log('**** inside passport*****');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


passport.use(new LocalStrategy({
    usernameField: 'email'

    },
    function(email,password,done){
        //find a user and establish the identity
        console.log('EMAIL ==> ',email, 'and PASS ==> ', password);
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('error in finding user--> Passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid Usernamd or password');
                return done(null,false, {message: 'Incorrect Password'});
            }

            return done(null,user);
        });
    }
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserializing the user from the key in cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user--> Passport');
            return done(err)
        }

        return done(null,user);
    })
})


module.exports = passport;
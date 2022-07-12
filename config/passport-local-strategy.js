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

            //if user not found or password don't match
            if(!user || user.password != password){
                console.log('Invalid Username or password');
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
});

// check if the user is authenticated by creating own function
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in, then pass on the request to the next function (controller's action (in routes))
    if(req.isAuthenticated()){
        return next()
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in')
}

// set the user for views and it will be a MV to check the user is signedIn or not and once the user is signed then:>
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending it to the locals for the views
        res.locals.user = req.user
    }

    next()
}

module.exports = passport;
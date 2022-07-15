const User = require('../models/user')

module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile',{
            title: 'User Profile',
            profile_user: user
        });
    })
}


// update the profile page 
module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send("Unauthorized");
    }
}



// render the sing up page
module.exports.signUp = function(req,res){
    // "isAuthenticated" detects if the user is signedIN or not
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: 'Sign Up'
    })
}

// render the sing in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: 'Sign In'
    })
}


// get the sign up data
module.exports.create = function(req,res){
    // check if the pass and c_pass are different
    if(req.body.password != req.body.confirm_password){
        console.log('password do not match')
        return res.redirect('back')
    }
    // find for the user in db
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding the user=>',err);
            return
        }
        // if user is not present in db
        if(!user){
            // create the user
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in signing up the user=>',err);
                    return
                }
                // if no err in creating the user then redirect to sign-in page
                return res.redirect('/users/sign-in');
            })

        // else if there is already a user with the same details then go back to sign-up page
        }else{
            return res.redirect('back');
        }
        
    })

}

// sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}


module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}
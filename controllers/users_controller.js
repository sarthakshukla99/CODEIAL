const User = require('../models/user')

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'User Profile'
    });
}

// render the sing up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: 'Sign Up'
    })
}

// render the sing in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: 'Sign In'
    })
}


// get the sign up data
module.exports.create = function(req,res){
    // check if the pass and c_pass are different
    if(req.body.password != req.body.confirm_password){
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
                    console.log('error in signin up the user=>',err);
                    return
                }
                // if no err in creating the user then redirct to sign-in page
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
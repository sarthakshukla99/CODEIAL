const User = require('../models/user')

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){
                console.log('error in geting data=>',err);
            }
            else if(user){
                return res.render('user_profile',{
                    title: 'User Profile',
                    user : user
                });
            }
            return res.redirect('/users/sign-in');
        });

    }else{
        return res.redirect('/users/sign-in');
    }
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
    // else if pass mateched then find for the user in db
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


module.exports.createSession = function(req,res){
    // steps to authenticate 
    //find the user
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding the user in signin in =>',err);
            return
        }
        //handle user found
        if(user){
            console.log('inside if user');
            //if user found then we will handle password which dont match
            if(user.password != req.body.password){
                console.log('pass donot match and pass is', user.password,'reqPass = ', req.body.password);
                return res.redirect('back');
            }
            
            //if everything goes fine then handle session creation

            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');


        }else{
            //handle user not found
            return res.redirect('/users/profile');

        }


    })
}


module.exports.logout = function(req,res){
    res.clearCookie('user_id');
    res.redirect('/users/sign-in');
}
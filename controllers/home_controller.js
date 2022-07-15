// module.exports.actionName = func(req,res){}
const Posts = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req,res){
    // populate the user/author of each post
    Posts.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err,posts){
        if(err){
            console.log('error in finding posts', err);
            return
        }
        else{
            User.find({}, function(err,users){
                return res.render('home',{
                    title: 'Codeial | Home',
                    posts: posts,
                    all_users: users
                })

            })


        }
    })


}
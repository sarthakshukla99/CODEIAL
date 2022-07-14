// module.exports.actionName = func(req,res){}
const Posts = require('../models/post');
module.exports.home = function(req,res){
    // populate the user/author of each post
    Posts.find({}).populate('user').exec(function(err,posts){
        if(err){
            console.log('error in finding posts', err);
            return
        }
        else{
            return res.render('home',{
                title: 'Codeial | Home',
                posts: posts
            })

        }
    })


}
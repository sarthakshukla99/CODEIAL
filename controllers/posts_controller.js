const Post = require('../models/post');

// let alert = require('alert'); 



module.exports.create = function(req,res){

    if(req.isAuthenticated()){
        Post.create({
            content: req.body.content,
            user: req.user._id
        }, function(err,post){
            if(err){
                console.log('error in creating the post ', err);
                return
            }
            else{
                // console.log('post is =>', post);
                return res.redirect('back');
            }
        })
    }
    else{
        // alert('Please login first to create a post')
        return res.redirect('back')
    }
    
}
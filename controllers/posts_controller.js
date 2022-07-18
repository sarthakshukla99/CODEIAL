const Post = require('../models/post');

const Comment = require('../models/comment');
// let alert = require('alert'); 


// creating post 
module.exports.create = async function(req,res){

    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success', 'Posted Successfully');
        return res.redirect('back');
    } catch (error){
        req.flash('error', error);
        return res.redirect('back');
    }
    
}


module.exports.destroy = async function(req,res){

    try {
        // when we are comparing id's of 2 object we have to convert them into string
        // .id means converting the object into string
        let post = await Post.findById(req.params.id);

        // if post creator and logged in user are same.
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            req.flash('success', 'Posted deleted Successfully');

            return res.redirect('back');
        }else{
            req.flash('error', 'User not found/matched');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return 
    }



    // ============== OLD CODE ====================

    // Post.findById(req.params.id, function(err,post){

    //     // if post creator and logged in user are same.
    //     if(post.user == req.user.id){
    //         post.remove();

    //         Comment.deleteMany({post: req.params.id}, function(err){
    //             return res.redirect('back');
    //         });
    //     }else{
    //         console.log('user did not found/match');
    //         return res.redirect('back');
    //     }
    // })

    
}
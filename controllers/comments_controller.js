const Comment = require('../models/comment');

const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err,post){
        // if we have the post then only we will add the comment
        console.log('here inside comment cont',post);
        if(post){
            console.log('post available');
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err,comment){
                console.log('inside ******')
                if(err){
                    console.log('error in creating the comment ', err);
                    return
                }
                else{
                    // create the comment
                    // FIXME ASK ABOUT po
                    post.comments.push(comment);
                    post.save()      
                    console.log('comment added ', comment);
                    return res.redirect('/');
                }
            })
        }
        else{
            // if user is not logged in then don't add comment
            console.log('post not available');
            return res.redirect('back')
        }
    
    })
} 
















// ====================================

// Post.findById(req.body.postId, function(err , post){
//     if(err){
//         console.log('error in finding post ',err);
//         return
//     }

//     Comment.create({
//         content: req.body.content,
//         post: req.body.postId,
//         user: req.user._id
//     }, function(err,comment){
//         // handle err skip
//         post.comments.push(comment);
//         post.save();
//         res.redirect('/');
//     });

// })
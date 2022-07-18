const Comment = require('../models/comment');

const Post = require('../models/post');

module.exports.create = async function(req,res){

    try {
        let post = await Post.findById(req.body.post)
        // if we have the post then only we will add the comment
        console.log('here inside comment cont',post);

        if(post){
            console.log('post available');
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }) 

            // create the comment
            // FIXME ASK ABOUT po
            post.comments.push(comment);
            post.save()      
            req.flash('success', 'Comment Added Successfully');
            return res.redirect('/');
                
            
        }
    } catch (err) {
        req.flash('error', err);
        return
    }



// =================== OLD CODE ==============================


    
    // Post.findById(req.body.post, function(err,post){
    //     // if we have the post then only we will add the comment
    //     console.log('here inside comment cont',post);
    //     if(post){
    //         console.log('post available');
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id
    //         }, function(err,comment){
    //             console.log('inside ******')
    //             if(err){
    //                 console.log('error in creating the comment ', err);
    //                 return
    //             }
    //             else{
    //                 // create the comment
    //                 // FIXME ASK ABOUT po
    //                 post.comments.push(comment);
    //                 post.save()      
    //                 console.log('comment added ', comment);
    //                 return res.redirect('/');
    //             }
    //         })
    //     }
    //     else{
    //         // if user is not logged in then don't add comment
    //         console.log('post not available');
    //         return res.redirect('back')
    //     }
    
    // })
} 


module.exports.destroy = async function(req,res){

    try {
        let comment = await Comment.findById(req.params.id)
        // if the comment belongs to the user who is signed in 
        if(comment.user == req.user.id){
            // before deleting comment store the post id inside comment to update post
            let postId = comment.post;
            comment.remove();

            // after deleting the post just update the post by removing the deleted comment

            // PULL is used to pull out the commentId from the list of comment
            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}})
            req.flash('success', 'Comment Deleted Successfully');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return
    }
    


    

    

    // ======================= OLD CODE ===========================

    // Comment.findById(req.params.id, function(err,comment){
    //     // if the comment belongs to the user who is signed in 
    //     if(comment.user == req.user.id){
    //         // before deleting comment store the post id inside comment to update post
    //         let postId = comment.post;
    //         comment.remove();

    //         // after deleting the post just update the post by removing the deleted comment

    //         // PULL is used to pull out the commentId from the list of comment
    //         Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err,post){
    //             return res.redirect('back');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    // })
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
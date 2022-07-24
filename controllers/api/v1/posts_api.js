const Post = require('../../../models/post');

const Comment = require('../../../models/comment')

module.exports.index = async function(req,res){

    // populate the user/author of each post
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',    // to populate comments
        populate:{
            path: 'user'     // to populate users of the comment
        }
    })


    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}




module.exports.destroy = async function(req,res){

    try {

        let post = await Post.findById(req.params.id);
        
        if(post.user == req.user.id){

        
            post.remove();

            await Comment.deleteMany({post: req.params.id});


            return res.json(200, {
                message: 'Posts and associated comments deleted successfully'
            });
        }
        else{
            return res.json(401,{
                message: 'You cant delete this post'
            })
        }


    } catch (err) {
        console.log('******', err);
        return res.json(500, {
            message: 'Internal server error'
        });
    }


}
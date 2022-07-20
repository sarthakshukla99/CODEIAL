// module.exports.actionName = func(req,res){}
const Posts = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res){
    // ASYNC AWAIT 

    try{
        // populate the user/author of each post
        let posts = await Posts.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',    // to populate comments
            populate:{
                path: 'user'     // to populate users of the comment
            }
        }).sort('-createdAt')
        
        let users = await User.find({})

        return res.render('home',{
            title: 'Codeial | Home',
            posts: posts,
            all_users: users
        })
    }

    catch(err){
        
        console.log(err);
        return
    }





    // ==============NORMAL CODE ====================

    // // populate the user/author of each post
    // Posts.find({})
    // .populate('user')
    // .populate({
    //     path: 'comments',    // to populate comments
    //     populate:{
    //         path: 'user'     // to populate users of the comment
    //     }
    // })
    // .exec(function(err,posts){
    //     if(err){
    //         console.log('error in finding posts', err);
    //         return
    //     }
    //     else{
    //         User.find({}, function(err,users){
    //             return res.render('home',{
    //                 title: 'Codeial | Home',
    //                 posts: posts,
    //                 all_users: users
    //             })

    //         })


    //     }
    // })





}
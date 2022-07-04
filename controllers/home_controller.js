// module.exports.actionName = func(req,res){}
module.exports.home = function(req,res){
    return res.render('home',{
        title: 'HOme'
    })
}
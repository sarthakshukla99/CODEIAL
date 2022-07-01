// module.exports.actionName = func(req,res){}
module.exports.home = function(req,res){
    res.send('<h1>This data s coming from home controller</h1>');
}
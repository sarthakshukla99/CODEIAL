const express = require('express');
const app = express();
const port = 3000;


app.listen(port,(err)=>{
    if(err){
        console.log("error==>",err);
    }
    else{
        console.log('server is running on port:',port);
    }
})
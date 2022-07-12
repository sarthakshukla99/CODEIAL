const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development').
then(()=>console.log('connection succesful')).catch((err)=>console.log('error in connection=>',err));



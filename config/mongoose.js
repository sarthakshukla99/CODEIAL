const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development').
then(()=>console.log('connection successful to db')).catch((err)=>console.log('error in connection=>',err));



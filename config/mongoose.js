const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`).
then(()=>console.log('connection successful to db')).catch((err)=>console.log('error in connection=>',err));



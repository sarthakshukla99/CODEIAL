const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

// use layout functionality in ejs
app.use(expressLayouts)

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)


// set up the view engine 
app.set('view engine','ejs');
app.set('views','./views');

// add a MV which takes that session cookie and encrypts it 
app.use(session({
    name: 'codeial', //name of the cookie
    //TODO change the secret before deployement in production mode
    secret: 'blahsomething', // key to encode cookie
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

// to tell the app to use passport
app.use(passport.initialize());
app.use(passport.session()); // passport also helps in maintaining the sessions

// use express router 
app.use('/', require('./routes/index'))

app.listen(port,(err)=>{
    if(err){
        console.log("error==>",err);
    }
    else{
        console.log('server is running on port:',port);
    }
})
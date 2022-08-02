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
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


// using socket.io for making chat engine
// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets =require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(3300);
console.log('chat server is at port 3300');


// ====cors ====
var cors = require('cors')
app.use(cors())
// =============



app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix:'/css'
}))


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

// use layout functionality in ejs
app.use(expressLayouts)

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)


// set up the view engine 
app.set('view engine','ejs');
app.set('views','./views');


// add a MV which takes that session cookie and encrypts it 
// mongo store is used to store the session cookie in db
app.use(session({
    name: 'codeial', //name of the cookie
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething', // key to encode cookie
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled'
      },
      function(err){
          console.log(err || 'connect-mongodb setup ok');
      }
      )
}));

// to tell the app to use passport
app.use(passport.initialize());
app.use(passport.session()); // passport also helps in maintaining the sessions
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router 
app.use('/', require('./routes/index'));

app.listen(port,(err)=>{
    if(err){
        console.log("error==>",err);
    }
    else{
        console.log('server is running on port:',port);
    }
})
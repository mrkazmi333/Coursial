const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

//Used for session cookie
const session = require('express-session');

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-outh2-strategy');

const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: false,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('assets'));

//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(expressLayouts);

//Extract the stles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//Set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codial',
    //TODO chnage the secret before the deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
        
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
//Use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    // layout pehle work kar rha tha
    //yes what was the lst thing u did
    //mtlb
    //last xhhez konsi ki thi jiske bad stop kar dia working 
    //ye doubt jis lecture m raise kra usi k baad s
    //tumne alag file bnayi bas post ki , uske abd na
    //aur friends list bhi add kri ok
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
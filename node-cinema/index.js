var express = require('express');
var path = require('path');
var route = require('./route');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser')
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);
var app = express();

app.use(express.static('www'));

app.engine('html', require('ejs').renderFile);

// Set directory to contain the templates ('views')
app.set('views', path.join(__dirname, 'views'));

// Set view engine to use, in this case 'pug'
app.set('view engine', 'html');

//app.set('layout', 'views/layout');

app.use(ejsLayouts);

//app.use(cookieParser('M4ATA5'));
//app.use(express.cookieSession());

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//use before router
app.use(session({
    store: new SQLiteStore,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 week 
}));

app.use('/', route);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});




// sudo rimraf package-lock.json 
// "sqlite3": "^3.1.9"
/*

    "body-parser": "^1.17.2",
    "ejs": "^2.5.7",
    "express": "^4.15.4",
    "express-ejs-layouts": "^2.3.1",
    "sqlite3": "^3.1.9"


*/
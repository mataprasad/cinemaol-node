var express = require('express');
var path = require('path');
var route = require('./route');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser')
var session = require('express-session');
var common = require('./common');
var SQLiteStore = require('connect-sqlite3')(session);

var app = express();

app.use(express.static(common.config.static_file_dir));

app.engine('html', require('ejs').renderFile);

// Set directory to contain the templates ('views')
app.set('views', path.join(__dirname, common.config.view_dir));

// Set view engine to use, in this case 'pug'
app.set('view engine', 'html');

//app.set('layout', 'views/layout');

app.use(ejsLayouts);

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//use before router
app.use(session({
    store: new SQLiteStore,
    secret: common.config.session_storage_secret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 week 
}));

app.use('/', route);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(common.config.server_port, function() {
    console.log('Example app listening on port ' + common.config.server_port + ' !');
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
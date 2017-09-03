var db = require('../db');
var fs = require("fs");
var path = require('path');
var url = require('url');
var common = require('../common');
var crypto_helper = require("../crypto-helper");

exports.index = function(req, res) {

    var model = common.initModel(req);

    //console.log(req.cookies);

    req.session.logged_user = { a: "Hello..." };
    req.session.user = "mata prasad chauhan";
    res.locals.req = req;

    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    //console.log(JSON.stringify(req.session));
    //res.cookie('cookieName', crypto_helper.encrypt(JSON.stringify(req.session)), { maxAge: 900000, httpOnly: true });
    //console.log('cookie created successfully');
    /*

	How to get req and res object of Expreejs in .ejs file


If you want to access the "req/res" in the EJS templates, you can either pass the req/res object to the res.render() in your controller function (the middleware specific for this request):

	res.render(viewName, { req : req, res : res };
	Or set the res.locals in some middleware serving all the requests (including this one):
	
	res.locals.req = req;
	res.locals.res = res;
	Then you will be able to access the "req/res" in EJS:
	
	<% res.redirect("http://www.stackoverflow.com"); %>



	*/

    db.SpGetMoviesImageURL(function(data) {

        db.FillMovieList(function(data1) {
            model.data = data;
            model.data1 = data1;
            res.render('index', model);
        });
    });
};

exports.login = function(req, res) {

    var model = common.initModel(req);

    //model.data = req.session.logged_user;
    //console.log(req.session.logged_user);

    res.render('public/login', model);
};

exports.register = function(req, res) {

    var model = common.initModel(req);

    res.render('public/register', model);
};


exports.movies = function(req, res) {

    var model = common.initModel(req);

    db.GetRunningMovies(function(data) {
        model.data = data;
        res.render('public/movies', model);
    });
};

exports.movies_up = function(req, res) {

    var model = common.initModel(req);

    db.GetUpCommingMovies(function(data) {
        model.data = data;
        res.render('public/movies-up', model);
    });
};

exports.about = function(req, res) {

    //console.clear();
    //var a = crypto_helper.decrypt(req.cookies.cookieName);
    //console.log(a);

    var model = common.initModel(req);

    res.render('public/about', model);
};

exports.contact = function(req, res) {

    var model = common.initModel(req);

    res.render('public/contact', model);
};

exports.manageShow = function(req, res) {

    var model = common.initModel(req);



    db.SpGetMoviesImageURL(function(data) {
        model.data = data;
        res.render('public/manage-show', model);
    });


};

exports.addShow = function(req, res) {

    res.set('Content-Type', 'application/json');

    db.SpAddShowInfo(req.body, function(data) {
        var data = { text: "insterted success fully." };
        res.send(data);
    });

};


exports.addMovie = function(req, res) {
    var finalName = req.file.path + path.extname(req.file.originalname);
    fs.renameSync(req.file.path, finalName);

    finalName = req.file.destination + req.file.filename + path.extname(req.file.originalname);
    finalName = finalName.replace("./www/", "");
    //res.set('Content-Type', 'application/json');
    //db.SpAddShowInfo(req.body,function(data) {
    //var data={ text:"insterted success fully."};
    //SpAddNewMovie
    /*console.log(req.file);
    console.log(common.config);
    console.log(common.config.isWin());*/
    //res.send(req.body);	
    //});

    //res.set('Content-Type', 'application/json');
    var model = common.initModel(req);
    db.SpAddNewMovie(req.body, finalName, function(data) {
        var message = "insterted success fully.";

        model.message = message;
        res.render('public/manage-movie', model);
    });
};

exports.manageMovie = function(req, res) {

    var model = common.initModel(req);


    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    //console.log(query);
    //console.log(req.params);
    model.message = "";
    res.render('public/manage-movie', model);
};
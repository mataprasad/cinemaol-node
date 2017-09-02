var db = require('../db');

function initModel(req) {
    var rIp = req.connection.remoteAddress;
    return { ip: rIp, data: null };
}

exports.index = function(req, res) {

    var model = initModel(req);

    req.session.logged_user = { a: "Hello..." };
    req.session.user = "mata prasad chauhan";
    res.locals.req = req;
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
        model.data = data;
        res.render('index', model);
    });
};

exports.login = function(req, res) {

    var model = initModel(req);

    //model.data = req.session.logged_user;
    //console.log(req.session.logged_user);

    res.render('public/login', model);
};

exports.register = function(req, res) {

    var model = initModel(req);

    res.render('public/register', model);
};


exports.movies = function(req, res) {

    var model = initModel(req);

    db.GetRunningMovies(function(data) {
        model.data = data;
        res.render('public/movies', model);
    });
};

exports.movies_up = function(req, res) {

    var model = initModel(req);

    db.GetUpCommingMovies(function(data) {
        model.data = data;
        res.render('public/movies-up', model);
    });
};

exports.about = function(req, res) {

    var model = initModel(req);

    res.render('public/about', model);
};

exports.contact = function(req, res) {

    var model = initModel(req);

    res.render('public/contact', model);
};
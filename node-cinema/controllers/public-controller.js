var db = require('../db');
var fs = require("fs");
var path = require('path');
var url = require('url');


function initModel(req) {
    var rIp = req.connection.remoteAddress;
    return { ip: rIp, data: null,message:null };
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
        
            db.FillMovieList(function (data1)
            {
                model.data = data;
                model.data1=data1;
                res.render('index', model);
            });        
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

exports.manageShow = function(req, res) {
    
        var model = initModel(req);

        

        db.SpGetMoviesImageURL(function(data) {
            model.data = data;
            res.render('public/manage-show', model);
        });
    
     
    };
    
    exports.addShow=function(req, res) {	
        
       res.set('Content-Type', 'application/json');
       
       db.SpAddShowInfo(req.body,function(data) {
       var data={ text:"insterted success fully."};
        res.send(data);	
    });
      
    };


    exports.addMovie=function(req, res) {	
        var finalName=req.file.path+path.extname(req.file.originalname); 
        fs.renameSync(req.file.path, finalName);
        finalName=finalName.replace("www/","");
        //res.set('Content-Type', 'application/json');
        //db.SpAddShowInfo(req.body,function(data) {
        //var data={ text:"insterted success fully."};
        //SpAddNewMovie
        //console.log(req.file);
        //res.send(req.body);	
        //});

       //res.set('Content-Type', 'application/json');
       var model = initModel(req);
       db.SpAddNewMovie(req.body,finalName,function(data) {
       var message="insterted success fully.";
        
            model.message=message;
            res.render('public/manage-movie', model);
    });
    };
    
    exports.manageMovie = function(req, res) {
        
            var model = initModel(req);


            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;

            console.log(query);
            console.log(req.params);
            model.message="";
            res.render('public/manage-movie', model);
        };
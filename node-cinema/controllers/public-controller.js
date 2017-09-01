var db=require('../db'); 

function initModel(req)
{
	var rIp=req.connection.remoteAddress;
	return {ip:rIp,data:null};
}

exports.index=function(req, res) {	
	
	var model=initModel(req);

	db.SpGetMoviesImageURL(function(data)
	{
		model.data=data;
		res.render('index', model);
	});	
};

exports.login=function(req, res) {	
	
	var model=initModel(req);

	res.render('public/login', model);
};

exports.register=function(req, res) {	
	
	var model=initModel(req);

	res.render('public/register', model);
};


exports.movies=function(req, res) {	
	
	var model=initModel(req);

	db.GetRunningMovies(function(data)
	{
		model.data=data;
		res.render('public/movies', model);
	});		
};

exports.movies_up=function(req, res) {	
	
	var model=initModel(req);

	db.GetUpCommingMovies(function(data)
	{
		model.data=data;
		res.render('public/movies-up', model);
	});		
};

exports.about=function(req, res) {	
	
	var model=initModel(req);

	res.render('public/about', model);
};

exports.contact=function(req, res) {	
	
	var model=initModel(req);

	res.render('public/contact', model);
};
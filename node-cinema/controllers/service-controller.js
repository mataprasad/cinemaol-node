var db=require('../db'); 

function initModel(req)
{
	var rIp=req.connection.remoteAddress;
	return {ip:rIp,data:null};
}

exports.fill_date_list=function(req, res) {	
	
	res.set('Content-Type', 'application/json');
	
	db.FillDateList(req.body.pMovieTitle,function(data)
	{
		res.send(data);
	});	
};


exports.fill_time_list=function(req, res) {	
	
	res.set('Content-Type', 'application/json');

	db.FillTimeList(req.body.pMovieTitle,req.body.pMovieDate,function(data)
	{
		res.send(data);
	});	
};
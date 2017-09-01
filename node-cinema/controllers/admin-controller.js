

function initModel(req)
{
	var rIp=req.connection.remoteAddress;
	return {ip:rIp,data:null};
}

exports.login=function(req, res) {	
	
	var model=initModel(req);

	res.render('admin/login', model)
};
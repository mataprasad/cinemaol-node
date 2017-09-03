var common = require('../common');

exports.login = function(req, res) {

    var model = common.initModel(req);

    res.render('admin/login', model)
};
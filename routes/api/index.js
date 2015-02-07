var _ = require('lodash');
var model = require('../../model');

function paramsFromReq(req) {
	var params = _.clone(req.params);
	params.body = req.body;
	params.user = req.user;
	return params;
}

exports.rotations = function(req, res) {
	var params = paramsFromReq(req);
	model.rotations(function(error, results) {
		console.log(results);
		if (error) {
			return next(error);
		} else {
			res.json(results);
		}
	});
};

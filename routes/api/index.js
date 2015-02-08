var _ = require('lodash');
var model = require('../../model');

function paramsFromReq(req) {
	var params = _.clone(req.params);
	params.body = req.body;
	params.user = req.user;
	return params;
}

exports.chores = function(req, res) {
	var params = paramsFromReq(req);
	model.chores(function(error, results) {
		console.log(results);
		if (error) {
			return next(error);
		} else {
			res.json(results);
		}
	});
};

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

exports.rotations2chores = function(req, res) {
	var params = paramsFromReq(req);
	model.rotations2chores(function(error, results) {
		console.log(results);
		if(error) {
			return next(error);
		} else {
			res.json(results);
		}
	});
};

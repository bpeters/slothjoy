var _ = require('lodash');
var model = require('../../model');

function paramsFromReq(req) {
	var params = _.clone(req.params);
	params.body = req.body;
	params.user = req.user;
	return params;
}

exports.chores = function(req, res, next) {
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

exports.board = function(req, res, next) {
	var params = paramsFromReq(req);
	model.board(params.id, function(error, results) {
		console.log(results);
		if (error) {
			return next(error);
		} else {
			res.json(results);
		}
	});
};

exports.createBoard = function(req, res, next) {
	var params = paramsFromReq(req);
	var id = Math.random().toString(36).slice(2);
	model.createBoard(id, function(error, results) {
		console.log(results);
		if (error) {
			return next(error);
		} else {
			res.json(results);
		}
	});
};

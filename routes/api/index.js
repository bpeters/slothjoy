var _ = require('lodash');
var model = require('../../model');

function paramsFromReq(req) {
	var params = _.clone(req.params);
	params.query = req.query;
	params.body = req.body;
	params.user = req.user;
	return params;
}

exports.chores = function(req, res, next) {
	var params = paramsFromReq(req);
	model.chores(function(error, results) {
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
		if (error) {
			return next(error);
		} else {
			res.json(results);
		}
	});
};

exports.users = function(req, res, next) {
	var params = paramsFromReq(req);
	model.users(params.id, function(error, results) {
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
		if (error) {
			return next(error);
		} else {
			res.json(results);
		}
	});
};

exports.addUser = function(req, res, next) {
	var params = paramsFromReq(req);
	model.addUser(params.id, params.body.username, function(error, results) {
		if (error) {
			return next(error);
		} else {
			res.json(results);
		}
	});
};

exports.updateChore = function(req, res, next) {
	var params = paramsFromReq(req);
	model.updateChore(params.id, params.body.chore, function(error, results) {
		if (error) {
			return next(error);
		} else {
			res.json(results);
		}
	});
};

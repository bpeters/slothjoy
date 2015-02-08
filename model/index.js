var Parse = require('parse').Parse;
var config = require('config');
var _ = require('lodash');
var parseApp = process.env.PARSE_APP || config.get('Parse.app');
var parseJavascript = process.env.PARSE_JAVASCRIPT || config.get('Parse.javascript');

Parse.initialize(parseApp, parseJavascript);

var Chore = Parse.Object.extend("chore");
var Board = Parse.Object.extend("board");
var User = Parse.Object.extend("user");

exports.chores = function (callback) {
	var query = new Parse.Query(Chore);
	query.find({
		success: function(results) {
			var chores = _.map(results, function(chore, i) {
				return({
					rotationId: chore.get('rotation_id'),
					rotation: chore.get('rotation'),
					choreId: chore.get('chore_id'),
					chore: chore.get('chore'),
					chorePoints: chore.get('points'),
					choreCompleted: chore.get('chore_completed')
				});
			});
			if (chores) {
				console.log("Successfully retrieved " + chores.length + " chores.");
				var json = _.chain(chores)
					.groupBy(function(n) {
						return n.rotationId;
					})
					.pairs()
					.map(function(currentItem) {
						return _.zipObject(['rotationId','chores'], currentItem);
					})
					.value();
				for (var i = 0; i < json.length; i++) {
					var obj = _.find(chores, { 'rotationId': json[i].rotationId });
					json[i].rotation = obj.rotation;
				}
				return callback(null, json);
			} else {
				console.log("Not Found");
				return callback('Not Found', null);
			}
		},
		error: function(error) {
			console.log("Error: " + error.code + " " + error.message);
			return callback(error, null);
		}
	});
};

exports.board = function (id, callback) {
	var query = new Parse.Query(Board);
	query.equalTo("board_id", id);
	query.find({
		success: function(results) {
			var chores = _.map(results, function(chore, i) {
				return({
					rotationId: chore.get('rotation_id'),
					rotation: chore.get('rotation'),
					rotationPoints: chore.get('rotation_points'),
					choreId: chore.get('chore_id'),
					chore: chore.get('chore'),
					chorePoints: chore.get('chore_points'),
					choreInitialPoints: chore.get('chore_initial_points'),
					choreCompleted: chore.get('chore_completed'),
					choreLastResetTs: chore.get('chore_last_reset_ts')
				});
			});
			if (chores) {
				console.log("Successfully retrieved " + chores.length + " chores.");
				var json = _.chain(chores)
					.groupBy(function(n) {
						return n.rotationId;
					})
					.pairs()
					.map(function(currentItem) {
						return _.zipObject(['rotationId','chores'], currentItem);
					})
					.value();
				for (var i = 0; i < json.length; i++) {
					var obj = _.find(chores, { 'rotationId': json[i].rotationId });
					json[i].rotation = obj.rotation;
					json[i].rotationPoints = obj.rotationPoints;
				}
				return callback(null, json);
			} else {
				console.log("Not Found");
				return callback('Not Found', null);
			}
		},
		error: function(error) {
			console.log("Error: " + error.code + " " + error.message);
			return callback(error, null);
		}
	});
};

exports.users = function (id, callback) {
	var query = new Parse.Query(User);
	query.equalTo("board_id", id);
	query.find({
		success: function(results) {
			var users = _.map(results, function(user, i) {
				return({
					userId: user.get('user_id'),
					userName: user.get('user_name'),
					userPoints: user.get('user_points')
				});
			});
			if (users) {
				console.log("Successfully retrieved " + users.length + " chores.");
				return callback(null, users);
			} else {
				console.log("Not Found");
				return callback('Not Found', null);
			}
		},
		error: function(error) {
			console.log("Error: " + error.code + " " + error.message);
			return callback(error, null);
		}
	});
};

exports.createBoard = function (id, callback) {
	var query = new Parse.Query(Chore);
	var boardArray = [];
	var date = new Date(Date.now());
	query.find({
		success: function(results) {
			if (results) {
				for (var i = 0; i < results.length; i++) {
					var board = new Board();
					board.set('board_id', id);
					board.set('rotation_id', results[i].get('rotation_id'));
					board.set('rotation', results[i].get('rotation'));
					board.set('rotation_points', 0);
					board.set('chore_id', results[i].get('chore_id'));
					board.set('chore', results[i].get('chore'));
					board.set('chore_points', results[i].get('points'));
					board.set('chore_initial_points', results[i].get('points'));
					board.set('chore_last_reset_ts', date);
					board.set('chore_completed', false);
					boardArray.push(board);
				}
				Parse.Object.saveAll(boardArray, {
					success: function(objs) {
						return callback(null, id);
					},
					error: function(error) {
						console.log("Error: " + error.code + " " + error.message);
						return callback(error, null);
					}
				});
			} else {
				console.log("Not Found");
				return callback('Not Found', null);
			}
		},
		error: function(error) {
			console.log("Error: " + error.code + " " + error.message);
			return callback(error, null);
		}
	});
};

exports.addUser = function (id, username, callback) {
	var userId = Math.random().toString(36).slice(2);
	var user = new User();
	user.set('board_id', id);
	user.set('user_id', userId);
	user.set('user_name', username);
	user.set('user_points', 0);
	user.save(null, {
		success: function(user) {
			return callback(null, user);
		},
		error: function(error) {
			console.log("Error: " + error.code + " " + error.message);
			return callback(error);
		}
	});
};

exports.updateChore = function (id, chore, callback) {
	var query = new Parse.Query(Board);
	query.equalTo("board_id", id);
	query.equalTo("chore_id", chore.choreId);
	query.first({
		success: function(board) {
			board.set('rotation_id', chore.rotationId);
			board.set('rotation', chore.rotation);
			board.set('chore_completed', chore.choreCompleted);
			board.save(null, {
				success: function(board) {
					return callback(null, board);
				},
				error: function(error) {
					console.log("Error: " + error.code + " " + error.message);
					return callback(error);
				}
			});
		},
		error: function(error) {
			console.log("Error: " + error.code + " " + error.message);
			return callback(error, null);
		}
	});
};

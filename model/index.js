var Parse = require('parse').Parse;
var config = require('config');
var _ = require('lodash');
var parseApp = process.env.PARSE_APP || config.get('Parse.app');
var parseJavascript = process.env.PARSE_JAVASCRIPT || config.get('Parse.javascript');

Parse.initialize(parseApp, parseJavascript);

var Rotation = Parse.Object.extend("rotation");
var Chore = Parse.Object.extend("chore");
var Rotation2Chore = Parse.Object.extend("rotation2chore");

exports.chores = function (callback) {
	var query = new Parse.Query(Chore);
	query.find({
		success: function(results) {
			var chores = _.map(results, function(chore, i) {
				return({
					chore_id: chore.get('chore_id'),
					chore: chore.get('chore'),
					points: chore.get('points')
				});
			});
			if (chores) {
				console.log("Successfully retrieved " + chores.length + " chores.");
				return callback(null, chores);
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

exports.rotations = function (callback) {
	var query = new Parse.Query(Rotation);
	query.find({
		success: function(results) {
			var rotations = _.map(results, function(rotation, i) {
				return({
					rotation_id: rotation.get('rotation_id'),
					rotation: rotation.get('rotation')
				});
			});
			if (rotations) {
				console.log("Successfully retrieved " + rotations.length + " rotations.");
				return callback(null, rotations);
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

exports.rotations2chores = function (callback) {
	var query = new Parse.Query(Rotation2Chore);
	query.find({
		success: function(results) {
			var rotations2chores = _.map(results, function(rotation2chore, i) {
				return({
					rotation_id: rotation2chore.get('rotation_id'),
					chore_id: rotation2chore.get('chore_id'),
					current_points: rotation2chore.get('current_points'),
					next_reset_dt: rotation2chore.get('next_reset_dt')
				});
			});
			if (rotations2chores) {
				console.log("Successfully retrieved " + rotations2chores.length + " rotations2chores.");
				return callback(null, rotations2chores);
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

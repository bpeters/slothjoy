var Parse = require('parse').Parse;
var config = require('config');
var _ = require('lodash');
var parseApp = process.env.PARSE_APP || config.get('Parse.app');
var parseJavascript = process.env.PARSE_JAVASCRIPT || config.get('Parse.javascript');

Parse.initialize(parseApp, parseJavascript);

var Rotation = Parse.Object.extend("rotation");
var Chore = Parse.Object.extend("chore");

prepareChores = function (chores) {
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
	return json;
};

exports.rotations = function (callback) {
	var query = new Parse.Query(Rotation);
	query.find({
		success: function(results) {
			var rotations = _.map(results, function(rotation, i) {
				return({
					rotationId: rotation.get('rotation_id'),
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
					points: chore.get('points')
				});
			});
			if (chores) {
				console.log("Successfully retrieved " + chores.length + " rotations2chores.");
				var jsonChores = prepareChores(chores);
				return callback(null, jsonChores);
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

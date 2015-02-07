var Parse = require('parse').Parse;
var config = require('config');
var _ = require('lodash');
var parseApp = process.env.PARSE_APP || config.get('Parse.app');
var parseJavascript = process.env.PARSE_JAVASCRIPT || config.get('Parse.javascript');

Parse.initialize(parseApp, parseJavascript);

var Rotation = Parse.Object.extend("rotation");
var Chore = Parse.Object.extend("chore");
var Rotation2Chore = Parse.Object.extend("rotation2chore");

exports.rotations = function (callback) {
	var query = new Parse.Query(Rotation);
	query.find({
		success: function(results) {
			var rotations = _.map(results, function(rotation, i) {
				return({
					id: rotation.get('rotation_id'),
					name: rotation.get('rotation')
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

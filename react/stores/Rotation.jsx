var RotationActions = require('../actions/Rotation.jsx');
var Reflux = require('reflux');
var _ = require('lodash');
var request = require('superagent');

module.exports = Reflux.createStore({
	listenables: RotationActions,
	init: function() {
		this._rotations = [
			{
				id: '1',
				name: 'DAILY'
			},
			{
				id: '2',
				name: 'WEEKLY'
			},
			{
				id: '3',
				name: 'MONTHLY'
			},
			{
				id: '4',
				name: 'YEARLY'
			}
		];
	},
	getRotations: function() {
		var self = this;
		request
			.get('/api/1/rotations/')
			.end(function(error, results){
				if (error) {
					self.onLoadError(error);
				} else {
					self.onLoadSuccess(results.body);
				}
			});
	},
	onLoadSuccess: function(rotations) {
		this._rotations = rotations;
		this.trigger(this._rotations);
	},
	onLoadError: function(error) {
		this.trigger(this._rotations);
	},
	getDefaultData: function() {
		return this._rotations;
	}
});

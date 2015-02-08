var RotationActions = require('../actions/Rotation.jsx');
var Reflux = require('reflux');
var _ = require('lodash');
var request = require('superagent');

module.exports = Reflux.createStore({
	listenables: RotationActions,
	init: function() {
		this._chores = [];
	},
	getChores: function() {
		var self = this;
		request
			.get('/api/1/chores/')
			.end(function(error, results){
				if (error) {
					self.onLoadError(error);
				} else {
					self.onLoadSuccess(results.body);
				}
			});
	},
	onLoadSuccess: function(chores) {
		this._chores = chores;
		this.trigger(this._chores);
	},
	onLoadError: function(error) {
		this.trigger(this._chores);
	},
	getDefaultData: function() {
		return this._chores;
	}
});

var UserActions = require('../actions/User.jsx');
var Reflux = require('reflux');
var _ = require('lodash');
var request = require('superagent');

module.exports = Reflux.createStore({
	listenables: UserActions,
	init: function() {
		this._users = [];
	},
	getUsers: function(id) {
		var self = this;
		request
			.get('/api/1/users/' + id)
			.end(function(error, results){
				if (error) {
					self.onLoadError(error);
				} else {
					self.onLoadSuccess(results.body);
				}
			});
	},
	addUser: function(id, username) {
		var self = this;
		request
			.post('/api/1/add_user/' + id)
			.send({username: username})
			.end(function(error, results){
				if (error) {
					self.onLoadError(error);
				} else {
					self.getUsers(id);
				}
			});
	},
	onLoadSuccess: function(users) {
		this._users = users;
		this.trigger(this._users);
	},
	onLoadError: function(error) {
		this.trigger(this._users);
	},
	getDefaultData: function() {
		return this._users;
	}
});

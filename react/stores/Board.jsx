var BoardActions = require('../actions/Board.jsx');
var Reflux = require('reflux');
var _ = require('lodash');
var request = require('superagent');

module.exports = Reflux.createStore({
	listenables: BoardActions,
	init: function() {
		this._board = [];
	},
	createBoard: function(callback) {
		var self = this;
		request
			.post('/api/1/create_board')
			.end(function(error, results){
				if (error) {
					return callback(error);
				} else {
					return callback(null, results.body);
				}
			});
	},
	getBoard: function(id, callback) {
		var self = this;
		request
			.get('/api/1/board/' + id)
			.end(function(error, results){
				if (error) {
					self.onLoadError(error);
				} else {
					self.onLoadSuccess(results.body);
				}
			});
	},
	getDefaultBoard: function(callback) {
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
	updateChore: function(id, chore, callback) {
		var self = this;
		request
			.post('/api/1/update_chore/' + id)
			.send({chore: chore})
			.end(function(error, results){
				if (error) {
					self.onLoadError(error);
				} else {
					self.getBoard(id);
				}
			});
	},
	onLoadSuccess: function(board) {
		this._board = board;
		this.trigger(this._board);
	},
	onLoadError: function(error) {
		this.trigger(this._board);
	},
	getDefaultData: function() {
		return this._board;
	}
});

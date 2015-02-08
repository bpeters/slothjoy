var React = require('react');
var ItemTypes = require('./ItemTypes.jsx');
var UserActions = require('../actions/User.jsx');
var DragDropMixin = require('react-dnd').DragDropMixin;

module.exports = React.createClass({
	displayName: 'User',
	mixins: [DragDropMixin],
	propTypes: {
		user: React.PropTypes.object,
		params: React.PropTypes.object
	},
	getInitialState: function() {
		return {
			hasDropped: false,
			value: null
		};
	},
	handleChange: function(event) {
		this.setState({value: event.target.value});
	},
	addUser: function() {
		UserActions.addUser(this.props.params.id, this.state.value);
		this.setState({value: null});
	},
	configureDragDrop: function(registerType) {
		registerType(ItemTypes.USER, {
			dragSource: {
				beginDrag: function() {
					return {
						item: {
							user: this.props.user,
						}
					};
				},
				endDrag: function(didDrop) {
					if (didDrop) {
						this.setState({
							hasDropped: true
						});
					}
				}
			}
		});
	},
	render: function() {
		var type = ItemTypes.USER;
		var hasDropped = this.state.hasDropped;
		var isDragging = this.getDragState(type).isDragging;
		var display = hasDropped ? 'none' : 'flex';
		var opacity = isDragging ? 1 : 1;
		if (this.props.user) {
			return (
				<div className='flex-body'>
					<div className='flex-title' {...this.dragSourceFor(type)}>
						<span className='frequency-title'>{this.props.user.userName}</span>
					</div>
					<div className='flex-title'>
						<span className='frequency-title'>{this.props.user.userPoints}</span>
					</div>
				</div>
			);
		} else {
			return (
				<div className='flex-body'>
					<div className='flex-title'>
						<input className='name-input' type="text" value={this.state.value} onChange={this.handleChange} />
						<div className='add-user' onClick={this.addUser}><i className="fa fa-plus-square"></i></div>
					</div>
					<div className='flex-title'>

					</div>
				</div>
			);
		}
	}
});

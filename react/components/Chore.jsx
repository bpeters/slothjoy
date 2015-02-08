var React = require('react');
var ItemTypes = require('./ItemTypes.jsx');
var DragDropMixin = require('react-dnd').DragDropMixin;

module.exports = React.createClass({
	displayName: 'Chore',
	mixins: [DragDropMixin],
	propTypes: {
		chore: React.PropTypes.object
	},
	getInitialState: function() {
		return {
			hasDropped: false
		};
	},
	configureDragDrop: function(registerType) {
		registerType(ItemTypes.CHORE, {
			dragSource: {
				beginDrag: function() {
					return {
						item: {
							chore: this.props.chore,
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
		var type = ItemTypes.CHORE;
		var hasDropped = this.state.hasDropped;
		var isDragging = this.getDragState(type).isDragging;
		var display = hasDropped ? 'none' : 'flex';
		var opacity = isDragging ? 1 : 1;
		return (
			<div className='chore-card' {...this.dragSourceFor(type)} style={{display: display, opacity: opacity}}>
				<div className='chore-owner'></div>
				<div className='chore-text'>{this.props.chore.chore}</div>
				<div className='chore-points'>{this.props.chore.chorePoints}</div>
			</div>
		);
	}
});

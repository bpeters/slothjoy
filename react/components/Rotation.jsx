var React = require('react/addons');
var _ = require('lodash');
var Chore = require('./Chore.jsx');
var ItemTypes = require('./ItemTypes.jsx');
var DragDropMixin = require('react-dnd').DragDropMixin;

module.exports = React.createClass({
	displayName: 'Rotation',
	mixins: [DragDropMixin],
	propTypes: {
		rotation: React.PropTypes.object
	},
	getInitialState: function() {
		return {
			droppedItem: null,
			chores: this.props.rotation.chores
		};
	},
	configureDragDrop: function(registerType) {
		var dropTarget = {
			acceptDrop: function(item) {
				var chores = this.state.chores;
				chores.push(item.chore);
				this.setState({
					chores: chores
				});
			}
		};
		registerType(ItemTypes.CHORE, {
			dropTarget: dropTarget
		});
	},
	render: function() {
		var types = [ItemTypes.CHORE];
		var dropStates = types.map(this.getDropState);
		var opacity;

		if (dropStates.some(function(s) {
			return s.isHovering;
		})) {
			opacity = 0.8;
		} else if (dropStates.some(function(s) {
			return s.isDragging;
		})) {
			opacity = 0.5;
		}

		var chores = _.map(this.state.chores, function(chore, i) {
			return (
				<Chore key={i} chore={chore} />
			);
		});
		return (
			<div className='flex-body'>
				<div className='flex-title'>
					<span className='frequency-title'>{this.props.rotation.rotation}</span>
				</div>
				<div className='flex-body'>
					<div className='flex-column do' {...this.dropTargetFor.apply(this, types)} style={{opacity: opacity ? opacity : 1 }} >
						{chores}
					</div>
					<div className='flex-column done'>
						<div className='chore-card'></div>
					</div>
				</div>
			</div>
		)
	}
});

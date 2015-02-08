var React = require('react/addons');
var _ = require('lodash');
var Chore = require('./Chore.jsx');
var BoardActions = require('../actions/Board.jsx');
var ItemTypes = require('./ItemTypes.jsx');
var DragDropMixin = require('react-dnd').DragDropMixin;

module.exports = React.createClass({
	displayName: 'ChoreContainer',
	mixins: [DragDropMixin],
	propTypes: {
		chores: React.PropTypes.array,
		choreCompleted: React.PropTypes.bool,
		rotation: React.PropTypes.object,
		params: React.PropTypes.object
	},
	getInitialState: function() {
		return {
			droppedItem: null,
			chores: this.props.chores
		};
	},
	configureDragDrop: function(registerType) {
		var dropTarget = {
			acceptDrop: function(item) {
				var chores = this.state.chores;
				var inChores = false;
				item.chore.choreCompleted = this.props.choreCompleted;
				item.chore.rotationId = this.props.rotation.rotationId;
				item.chore.rotation = this.props.rotation.rotation;
				for (var i = 0; i < chores.length; i++) {
					if (item.chore.choreId === chores[i].choreId) {
						inChores = true;
					}
				}
				if (!inChores) {
					chores.push(item.chore);
					this.setState({
						chores: chores
					});
				}
				BoardActions.updateChore(this.props.params.id, item.chore);
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
		var self = this;
		var choreClass = this.props.choreCompleted ? 'done' : 'do';
		var chores = _.map(this.state.chores, function(chore, i) {
			if (chore.choreCompleted === self.props.choreCompleted) {
				return (
					<Chore key={i} chore={chore} />
				);
			}
		});
		return (
			<div className={'flex-column ' + choreClass} {...this.dropTargetFor.apply(this, types)} style={{opacity: opacity ? opacity : 1 }} >
				{ chores.length ? null : <div className='chore-card-default'>
					<div className='chore-text'>{this.props.choreCompleted ? 'Complete Chores' : 'Incomplete Chores'}</div>
				</div>}
				{chores}
			</div>
		)
	}
});

var React = require('react/addons');
var _ = require('lodash');
var ChoreContainer = require('./ChoreContainer.jsx');

module.exports = React.createClass({
	displayName: 'Rotation',
	propTypes: {
		rotation: React.PropTypes.object,
		params: React.PropTypes.object
	},
	render: function() {
		return (
			<div className='flex-body rotation'>
				<div className='flex-title'>
					<span className='frequency-title'>{this.props.rotation.rotation}</span>
				</div>
				<div className='flex-body'>
					<ChoreContainer rotation={this.props.rotation} chores={this.props.rotation.chores} choreCompleted={false} params={this.props.params}/>
					<ChoreContainer rotation={this.props.rotation} chores={this.props.rotation.chores} choreCompleted={true} params={this.props.params}/>
				</div>
			</div>
		)
	}
});

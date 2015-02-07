var React = require('react/addons');

module.exports = React.createClass({
	displayName: 'Rotation',
	propTypes: {
		rotation: React.PropTypes.object
	},
	render: function() {
		return (
			<div className='flex-title'>
				<span className='frequency-title'>{this.props.rotation.name}</span>
			</div>
		)
	}
});

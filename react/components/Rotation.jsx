var React = require('react/addons');

module.exports = React.createClass({
	displayName: 'Rotation',
	propTypes: {
		rotation: React.PropTypes.object
	},
	render: function() {
		return (
			<div className='flex-column'>
				<div className='flex-title'>
					<span className='frequency-title'>{this.props.rotation.name}</span>
				</div>
				<div className='flex-body'>
					<div className='flex-column do'>
						<div className='chore-card'></div>
						<div className='chore-card'></div>
						<div className='chore-card'></div>
						<div className='chore-card'></div>
					</div>
					<div className='flex-column done'>
						<div className='chore-card'></div>
					</div>
				</div>
			</div>
		)
	}
});

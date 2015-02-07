var React = require('react/addons');

module.exports = React.createClass({
	displayName: 'Main',
	propTypes: {
		params: React.PropTypes.object
	},
	render: function() {
		return (
			<div className='flex-page'>
				<ul className='navigation'>
					<li><a>Home</a></li>
					<li><a>Account</a></li>
				</ul>
				<div className='flex-row'>
					<div className='flex-title'>
						<span className='frequency-title'>BRENNEN</span>
					</div>
					<div className='flex-title'>
						<span className='frequency-title'>ROB</span>
					</div>
				</div>
				<div className='flex-row'>
					<div className='flex-title'>10</div>
					<div className='flex-title'>8</div>
				</div>
				<div className='flex-row'>
					<div className='flex-title'>
						<span className='frequency-title'>DAILY</span>
					</div>
					<div className='flex-title'>
						<span className='frequency-title'>WEEKLY</span>
					</div>
					<div className='flex-title'>
						<span className='frequency-title'>MONTHLY</span>
					</div>
					<div className='flex-title'>
						<span className='frequency-title'>YEARLY</span>
					</div>
				</div>
				<div className='flex-row'>
					<div className='flex-title'>1</div>
					<div className='flex-title'>2</div>
					<div className='flex-title'>3</div>
					<div className='flex-title'>4</div>
				</div>
				<div className='flex-row'>
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
					<div className='flex-body'>
						<div className='flex-column do'>
							<div className='chore-card'></div>
							<div className='chore-card'></div>
							<div className='chore-card'></div>
						</div>
						<div className='flex-column done'>
							<div className='chore-card'></div>
						</div>
					</div>
					<div className='flex-body'>
						<div className='flex-column do'>
							<div className='chore-card'></div>
							<div className='chore-card'></div>
						</div>
						<div className='flex-column done'>
							<div className='chore-card'></div>
						</div>
					</div>
					<div className='flex-body'>
						<div className='flex-column do'>
							<div className='chore-card'></div>
						</div>
						<div className='flex-column done'>
							<div className='chore-card'></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

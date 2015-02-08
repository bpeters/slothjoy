var React = require('react/addons');
var Rotation = require('./Rotation.jsx');
var RotationStore = require('../stores/Rotation.jsx');
var RotationActions = require('../actions/Rotation.jsx');
var _ = require('lodash');

module.exports = React.createClass({
	displayName: 'Main',
	propTypes: {
		params: React.PropTypes.object
	},
	getInitialState: function () {
		return {
			chores: []
		};
	},
	componentDidMount: function() {
		this.unsubscribe = RotationStore.listen(this.updateChores);
		RotationActions.getChores();
	},
	componentWillUnmount: function() {
		this.unsubscribe();
	},
	updateChores: function(chores) {
		this.setState({
			chores: chores
		});
	},
	render: function() {
		var rotations = _.map(this.state.chores, function(rotation, i) {
			return (
				<Rotation key={rotation.rotationId} rotation={rotation}/>
			);
		});
		return (
			<div className='flex-page'>
				<ul className='navigation'>
					<li><a>Chores</a></li>
					<li><a>Feed</a></li>
					<li><a>Account</a></li>
				</ul>
				<div className='flex-row'>
					<div className='flex-title'>
						<span className='frequency-title'>BRENNEN</span>
					</div>
				</div>
				<div className='flex-row'>
					<div className='flex-title'>10</div>
				</div>
				<div className='flex-row'>
					{rotations}
				</div>
			</div>
		)
	}
});

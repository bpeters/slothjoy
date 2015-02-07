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
			rotations: []
		};
	},
	componentDidMount: function() {
		this.unsubscribe = RotationStore.listen(this.updateRotations);
		RotationActions.getRotations();
	},
	componentWillUnmount: function() {
		this.unsubscribe();
	},
	updateRotations: function(rotations) {
		this.setState({
			rotations: rotations
		});
	},
	render: function() {
		var rotations = _.map(this.state.rotations, function(rotation, i) {
			return (
				<Rotation key={rotation.id} rotation={rotation}/>
			);
		});
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
					{rotations}
				</div>
			</div>
		)
	}
});

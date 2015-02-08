var React = require('react/addons');
var Rotation = require('./Rotation.jsx');
var BoardStore = require('../stores/Board.jsx');
var BoardActions = require('../actions/Board.jsx');
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
		this.unsubscribe = BoardStore.listen(this.updateChores);
		if (this.props.params.id) {
			BoardActions.getBoard(this.props.params.id);
		} else {
			BoardActions.getDefaultBoard();
		}
	},
	componentWillUnmount: function() {
		this.unsubscribe();
	},
	updateChores: function(chores) {
		this.setState({
			chores: chores
		});
	},
	createBoard: function() {
		BoardStore.createBoard(function(error, res) {
			if (error) {
				console.log(error);
			} else {
				window.location.replace(window.location + '' + res)
			}
		});
	},
	render: function() {
		var rotations = _.map(this.state.chores, function(rotation, i) {
			return (
				<Rotation key={rotation.rotationId} rotation={rotation}/>
			);
		});
		if (this.props.params.id) {
			return (
				<div className='flex-page'>
					<div className='navigation'>
						<div><a>SlothJoy</a></div>
						<div><a>Chores</a></div>
						<div><a>Feed</a></div>
						<div><a>Account</a></div>
					</div>
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
		} else {
			return (
					<div className='flex-page'>
						<div className='navigation'>
							<div className='logo'><a>SlothJoy</a></div>
						</div>
						<div className='start-container'>
							<div className='start-child'>
								<div>Hey there! Welcome to</div>
								<div>SlothJoy!</div>
								<div className='create-btn' onClick={this.createBoard}>Create Chore Board</div>
							</div>
						</div>
						<div className='flex-row demo'>
							<div className='flex-title'>
								<span className='frequency-title'>BILLY</span>
							</div>
							<div className='flex-title'>
								<span className='frequency-title'>RAY</span>
							</div>
							<div className='flex-title'>
								<span className='frequency-title'>BOBBY</span>
							</div>
							<div className='flex-title'>
								<span className='frequency-title'>LISA</span>
							</div>
						</div>
						<div className='flex-row demo'>
							<div className='flex-title'>102</div>
							<div className='flex-title'>96</div>
							<div className='flex-title'>84</div>
							<div className='flex-title'>121</div>
						</div>
						<div className='flex-row demo'>
							{rotations}
						</div>
					</div>
				)
		}
	}
});

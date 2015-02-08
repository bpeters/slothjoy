var React = require('react/addons');
var Rotation = require('./Rotation.jsx');
var User = require('./User.jsx');
var BoardStore = require('../stores/Board.jsx');
var BoardActions = require('../actions/Board.jsx');
var UserStore = require('../stores/User.jsx');
var UserActions = require('../actions/User.jsx');
var _ = require('lodash');

module.exports = React.createClass({
	displayName: 'Main',
	propTypes: {
		params: React.PropTypes.object
	},
	getInitialState: function () {
		return {
			chores: [],
			users: []
		};
	},
	componentDidMount: function() {
		this.unsubscribeBoard = BoardStore.listen(this.updateChores);
		this.unsubscribeUser = UserStore.listen(this.updateUsers);
		if (this.props.params.id) {
			BoardActions.getBoard(this.props.params.id);
			UserActions.getUsers(this.props.params.id);
		} else {
			BoardActions.getDefaultBoard();
		}
	},
	componentWillUnmount: function() {
		this.unsubscribeBoard();
		this.unsubscribeUser();
	},
	updateChores: function(chores) {
		this.setState({
			chores: chores
		});
	},
	updateUsers: function(users) {
		this.setState({
			users: users
		});
	},
	createBoard: function() {
		BoardStore.createBoard(function(error, res) {
			if (error) {
				console.log(error);
			} else {
				window.location.replace(window.location + '' + res);
			}
		});
	},
	render: function() {
		var self = this;
		var colors = [
			'#64BD8C',
			'#FFD628',
			'#E2B72E',
			'#FE584D',
			'#E954C3',
			'#37BFEF'
		];
		var users = _.map(this.state.users, function(user, i) {
			return (
				<User key={user.userId} user={user} color={colors[i]}/>
			);
		});
		var rotations = _.map(this.state.chores, function(rotation, i) {
			return (
				<Rotation key={rotation.rotationId} rotation={rotation} params={self.props.params}/>
			);
		});
		if (this.props.params.id) {
			return (
				<div className='flex-page'>
					<div className='navigation'>
						<div><a>SlothJoy</a></div>
						<div><a>Chores</a></div>
						<div><a>Feed</a></div>
					</div>
					<div className='flex-row'>
						<User params={this.props.params} />
						{users}
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
						<div className='flex-body' style={{backgroundColor: '#64BD8C'}}>
							<div className='flex-title'>
								<span className='frequency-title'>John</span>
							</div>
							<div className='flex-title'>
								<span className='frequency-title'>102</span>
							</div>
						</div>
						<div className='flex-body' style={{backgroundColor: '#FFD628'}}>
							<div className='flex-title'>
								<span className='frequency-title'>Lisa</span>
							</div>
							<div className='flex-title'>
								<span className='frequency-title'>128</span>
							</div>
						</div>
						<div className='flex-body' style={{backgroundColor: '#E2B72E'}}>
							<div className='flex-title'>
								<span className='frequency-title'>Hunter</span>
							</div>
							<div className='flex-title'>
								<span className='frequency-title'>84</span>
							</div>
						</div>
					</div>
					<div className='flex-row demo'>
						{rotations}
					</div>
				</div>
				)
		}
	}
});

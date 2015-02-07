var React = require('react/addons');
var Main = require('./components/Main.jsx');

function safeStringify(obj) {
	return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

module.exports = React.createClass({
	displayName: 'App',
	propTypes: {
		title: React.PropTypes.string,
		params: React.PropTypes.object
	},
	render: function() {
		var json = safeStringify(this.props);
		return (
			<html>
				<head lang="en">
					<base href="/"/>
					<meta charSet="utf-8"/>
					<meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
					<meta name="viewport" content="width=device-width, initial-scale=1"/>
					<title>{this.props.title}</title>
					<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" />
					<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" />
					<link href="/css/style.css" rel="stylesheet" />
				</head>
				<body>
					<Main params={this.props.params}/>
					<span id="props" dangerouslySetInnerHTML={{__html: json}}></span>
					<script type="text/javascript" src="/js/browserify/bundle.js"></script>
				</body>
			</html>
		)
	}
});

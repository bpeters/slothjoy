var React = require('react/addons');
var App = require('./App.jsx');
var App = React.createFactory(App);

var props = document.getElementById("props").innerHTML;
props = JSON.parse(props);

if (typeof window !== 'undefined') {
	window.onload = function() {
		React.render(App(props), document);
	};
}

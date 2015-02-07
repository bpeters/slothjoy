var Parse = require('parse').Parse;
var config = require('config');
var parseApp = config.get('Parse.app');
var parseJavascript = config.get('Parse.javascript');

Parse.initialize(parseApp, parseJavascript);


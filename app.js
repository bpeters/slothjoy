var express = require('express');
var app = express();
var path = require('path');
var swig  = require('swig');
var routes = require('./routes');
var model = require('./model');

app.use(express.static(path.join(__dirname, '/public')));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

//public routes
app.get('/', routes.index);
app.get('/:id', routes.board);

//api routes
app.get('/api/1/chores', routes.api.chores);
app.get('/api/1/board/:id', routes.api.board);
app.get('/api/1/users/:id', routes.api.users);
app.post('/api/1/create_board', routes.api.createBoard);
app.post('/api/1/add_user/:id', routes.api.addUser);
app.post('/api/1/update_chore/:id', routes.api.updateChore);

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		console.log(err);
		res.status(err.status || 500);
		res.send({
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send({
		message: err.message,
		error: {}
	});
});

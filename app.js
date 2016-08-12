var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var index = require('./routes/index');
var videos = require('./routes/videos');

var app = express();

var mongoURI = "mongodb://localhost:27017/myvideoportal3"; // replace with your mongodb url

var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function (err) {
  if (err) {
    console.log('mongodb connection error', err);
  } else {
    console.log('mongodb connection successful');
  }
});

MongoDB.once('open', function () {
  console.log('mongodb connection open');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up routes
app.use(express.static('public'));
app.use('/', index);
app.use('/public/videos', videos);

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
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listening on port: ', port);
});

module.exports = app;
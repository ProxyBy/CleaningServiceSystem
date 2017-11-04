const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const bdConfig = require('./config/bdConfig');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/users');


const app = express();
app.set('port', config.get('port'));
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + config.get('port'));
});

mongoose.connect(bdConfig.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+bdConfig.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
});

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/users', users);




/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
*/

























// Middleware
/*app.use(function(req, res, next){
    if (req.url == '/') {
        res.end("Hello");
    } else {
        next();
    }
});

app.use(function(req, res, next){
  if (req.url == '/test') {
    res.end("Test");
  } else {
    next();
  }
});

app.use(function(req, res, next){
    if (req.url == '/forbidden') {
        next(new Error('wops, denied'));
    } else {
        next();
    }
});

app.use(function(req, res) {
    res.send(404, 'Page not found');
});*/

//Error handler
app.use(function (err, req, res, next) {
    //MODE_ENW
    if (app.get('env') == 'development') {
        // var errorHandler = express.errorHandler();
        // errorHandler(err, req, res, next);
        next(err);
    } else {
        res.send(500);
    }
});

/*

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
*/

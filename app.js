require('./public/js/partial')
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var index = require('./routes/index');
var user = require('./routes/user');
var poem = require('./routes/poem');
var admin = require('./routes/admin');

var db = mongoose.connection;

mongoose.connect("mongodb://petercha:peter4682!@ds151279.mlab.com:51279/si_eum");

db.once("open", function() {
  console.log("Database is connected");
});

var gcs = require('@google-cloud/storage')({
  projectId: "si-eum-165814",
  keyFilename: './config/keyfile',
  credentials: require('./config/keyfile')
});

var options = {
    entity: 'allUsers',
    role: gcs.acl.READER_ROLE
  };
  
var bucket = gcs.bucket("si-eum-165814.appspot.com");

mongoose.Promise = require('bluebird');

var app = express();
require('./config/passport')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine' , 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use('/', index);
app.use('/user', user);
app.use('/poem', poem);
app.use('/admin', admin);

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it 
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


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

app.use(function(request, response, next) {
  response.locals.user = request.user;
  next();
});

app.listen(process.env.PORT || 8080, function(){
    console.log("Server is running!");
});

module.exports = app;

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let passport = require('passport')
let PostgreSqlStore = require('connect-pg-simple')(session);
require('dotenv').config();
require('./config/passport');

//require routes
let index = require('./routes/index');
let users = require('./routes/users');
let dashboard = require('./routes/dashboard');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  store: new PostgreSqlStore({
    conString: "postgres://localhost:5432/staycation_dev"
  }),
  resave: false,
  saveUninitialized: true,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    secure: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());

//use routes
app.use('/', index);
app.use('/users', users);
app.use('/dashboard', dashboard);

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

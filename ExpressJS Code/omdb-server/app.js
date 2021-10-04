const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());    //Cors- Cross Origin Request Script. It acts as a Middle Layer/
//It comes automatically with your web browser. It does not
//allow you to communicate between 2 different URLS- here localhost 4200 and localhost 3000.
//For this we need to tell browser to use CORS.
app.use(logger('dev'));  //Logging the request endpoint
app.use(express.json()); //Parse the body of the request
app.use(express.urlencoded({ extended: false })); //Parse the url of the request
app.use(cookieParser()); //Parse the cookie
app.use(express.static(path.join(__dirname, 'public'))); //Static Hoisting- Static Folder path

app.use('/', indexRouter);
app.use('/users', usersRouter);

const omdbRouter = require('./routes/omdb');
app.use('/omdb',omdbRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

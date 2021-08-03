const createError = require('http-errors');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const gymsRouter = require('./routes/gyms'); 
const coursesRouter = require('./routes/courses')
const trainersRouter = require('./routes/trainers')
const activitiesRouter = require('./routes/activities')
const commentsRouter = require('./routes/comments')
const usersRouter = require('./routes/users')
require("./models/gym");
require("./models/course");
require("./models/trainer");
require("./models/activity");
require("./models/comment");
require("./models/user");
const app = express();

const mongoose = require('mongoose');
const uri = "mongodb+srv://dana_comiselu:danapass@cluster0.bzmzc.mongodb.net/gyms_management?retryWrites=true&w=majority";
const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', indexRouter);
app.use('/gyms', gymsRouter);
app.use('/courses', coursesRouter);
app.use('/trainers', trainersRouter);
app.use('/activities', activitiesRouter);
app.use('/comments', commentsRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

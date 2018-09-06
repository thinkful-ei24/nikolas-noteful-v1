'use strict';

// Load array of notes

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');

const app = express();

const morgan = require('morgan');

const notesRouter = require('./router/notes.router');



app.use(morgan('dev'));  //when destructuring is this making it a function without need of ()?
app.use(express.json());
app.use(notesRouter);

app.use('/', express.static('public'));  //.use is a way of saying run this middleware function on everything request run through


const { PORT } = require('./config');
console.log('hello');

// ADD STATIC SERVER HERE




app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({message: 'Not Found'});
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
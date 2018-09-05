'use strict';

// Load array of notes

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');

const data = require('./db/notes');

const simDB = require('./db/simDB');  // <<== add this
const notes = simDB.initialize(data); // <<== and this

const app = express();

app.use('/', express.static('public'));  //.use is a way of saying run this middleware function on everything request run through

const { logger } = require('./middleware/logger');


app.use(logger);

const { PORT } = require('./config');
console.log('hello');

// ADD STATIC SERVER HERE

app.get('/api/notes/:id', (req, res)=> {
   
  const id = req.params.id;
  let obj = data.find(item => item.id === Number(id));
  return res.send(obj);
});

app.get('/api/notes', (req, res) => {
    
  const { searchTerm } = req.query;
  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});


app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

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
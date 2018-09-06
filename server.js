'use strict';

// Load array of notes

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');

const data = require('./db/notes');

const simDB = require('./db/simDB');  // <<== add this
const notes = simDB.initialize(data); // <<== and this

const app = express();

const { logger, sayHi } = require('./middleware/logger');

const morgan = require('morgan');


app.use(morgan('dev'));  //when destructuring is this making it a function without need of ()?

app.use('/', express.static('public'));  //.use is a way of saying run this middleware function on everything request run through
app.use(express.json());







const { PORT } = require('./config');
console.log('hello');

// ADD STATIC SERVER HERE

app.get('/api/notes/:id', (req, res, next)=> {
   
  const id = req.params.id;
  notes.find(id, (err, item) => {
    if (err) {
      console.log(err);
    } 
    if (item) {
      console.log(item);
      return res.send(item);
    }
    else {
      next();
    }
    
  });
  
});

app.delete('/api/notes/:id', (req, res, next) => {
  const {id} = req.params;
  console.log(id);
  notes.delete(id, (err, success) => {
    if(err) {
      return next(err);
    }
    if(success) {
      console.log("The item was deleted!");
    }
  });
});

app.get('/api/notes', (req, res, next) => {
    
  const { searchTerm } = req.query;
  notes.filter(searchTerm, (err, list) => { //why is err first here
    if (err) {
      return next(err); // goes to error handler
    } 
    if (list) {
      res.json(list); // responds with filtered array
    }
    else {
      next();
    }
  });
  
});

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
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
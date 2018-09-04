'use strict';

// Load array of notes

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');

const data = require('./db/notes');

const app = express();

app.use(express.static('public'));


// ADD STATIC SERVER HERE

app.get('/api/notes/:id', (req, res)=> {
   
   const id = req.params.id;
   let obj = data.find(item => item.id === Number(id));
   return res.send(obj);
});

app.get('/api/notes', (req, res) => {
    
    const searchTerm = req.query.searchTerm;
    if (searchTerm) {
    let filteredList = data.filter(function(item) {
      return item.title.includes(searchTerm);
    });
    res.json(filteredList);
  } else {
    res.json(data);
  }
});

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
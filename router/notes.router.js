'use strict';

const express = require('express');
const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);


const router = express.Router();

router.get('/api/notes/:id', (req, res, next)=> {
   
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
  
router.delete('/api/notes/:id', (req, res, next) => {
  const {id} = req.params;
  console.log(id);
  notes.delete(id, (err, item) => {
    if(err) {
      return next(err);
    }
    if(item) {
      res.status(204).send(`${item} was deleted`);
    }
    else {
      err.status(500);
      next();
    }
  });
  
});
  
  
  
router.get('/api/notes', (req, res, next) => {
      
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
  
router.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];
  
  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  console.log(updateObj);
  
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





module.exports = router;
// module.exports.notesRouter = router;
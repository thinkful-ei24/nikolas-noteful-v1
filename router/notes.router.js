'use strict';

const express = require('express');
const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);




const router = express.Router();

router.get('/api/notes/:id', (req, res, next)=> {
   
  const id = req.params.id;
  notes.find(id).then(item => {
    if (item) {
      console.log(item);
      return res.send(item);
    }
    else {
      next();
    }   
  }).catch(err => {
    if (err) {
      return next(err);
    } 
  }); 
});
  
router.delete('/api/notes/:id', (req, res, next) => {
  const {id} = req.params;
  console.log(id);
  notes.delete(id).then(item => {
    if(item) {
      res.status(204).send(`${item} was deleted`);
    }
    else {
      next();
    }
  }).catch(err => {
    if(err) {
      return next(err);     
    }
  });
});
  
router.post('/api/notes/', (req, res, next) => {
  let obj = req.body;
  notes.create(obj).then(obj =>{
    if(obj) {
      res.json(obj);
    }
    else {
      next();
    }
  }).catch(err => {
    if(err) {
      next(err);
    }
  });
});
  
  
router.get('/api/notes', (req, res, next) => {
      
  const { searchTerm } = req.query;
  notes.filter(searchTerm).then(list => { //why is err first here
    
    if (list) {
      res.json(list); // responds with filtered array
    }
    else {
      next();
    }
  }).catch(err => {
    if (err) {
      return next(err); // goes to error handler
    } 
  });  
});
  
router.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(req.body);
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
  
  notes.update(id, updateObj).then(item => {

    if (item) {
      res.json(item);
    } else {
      next();
    }
  }).catch(err => {
    return next(err);
  });
});






module.exports = router;
// module.exports.notesRouter = router;
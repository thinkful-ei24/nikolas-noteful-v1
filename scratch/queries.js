const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

//GET Notes with search
notes.filter('cats', (err, list) => {
  if (err) {
    console.error(err);
  }
  console.log(list);
});

// GET Notes by ID
notes.find(1005, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

// PUT (Update) Notes by ID
const updateObj = {
  title: 'New Title',
  content: 'Blah blah blah'
};

const testItem = {}

notes.create(testItem, (err, item) => {
    if(err) {
        console.log(err);
    }
    if(item) {
        console.log("Item is created");
    }
});



notes.delete(99, (err, success) => {
    if(err) {
        console.error(err);
    }
    if(success) {
        console.log("Deleted!");
    }
})

notes.update(1005, updateObj, (err, item) => {
  if (err) {
    console.error(err.message);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});
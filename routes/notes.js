const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils.js');
const { v4: uuidv4 } = require('uuid');
//const { request } = require('express');

//const { readFromFile, readAndAppend } = require('../db/db.json');
// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.delete('/:id', (req, res) => {

  console.info(`${req.method} request received to delete note`);
  console.log(req.body);

  if (req.params.id) {
    const noteId=req.params.id;
    console.log(noteId);
    readFromFile('./db/db.json').then((data) => {
      let parcedData=JSON.parse(data);
        let updatedData=parcedData;
      for (let i = 0; i < parcedData.length; i++) {
       if (parcedData[i].note_id===noteId) {
          updatedData.splice(i,1);
          console.log('match found')
        }
       // console.log(parcedData[i].note_id)
      }
      console.log(parcedData);
      writeToFile('./db/db.json',parcedData)
      console.log('delet successfully!')
      
    });
    res.json('note deleted successfuly');
  }else{
  res.error("error deleting note");
  }
  
 

});

// POST Route for a new UX/UI notes
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add note`);
  console.log(req.body);

  const { title, text } = req.body;
  console.log(title)
  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };
     console.log(newNote);
    readAndAppend(newNote, './db/db.json');
    res.json(`Notes added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;

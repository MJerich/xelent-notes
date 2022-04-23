const fs = require("fs");
const path = require("path");
const router = require('express').Router();
const { notes } = require('../db/db');

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    // return finished code to post route for responce
    return note;
}

function findById(title, notesArray) {
    const result = notesArray.filter(notes => notes.title === title)[0];
    return result;
}

// get all notes
router.get('/notes', (req, res) => {
    res.json(notes);
});

// make a new note
router.post('/notes', (req, res) => {
    const note = createNewNote(req.body, notes);
    res.json(note);
});

// get a single note by title
router.get('/notes/:title', (req, res) => {
    const result = findById(req.params.title, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});


module.exports  = router;
const express = require('express');
const router = express.Router(); 
const noteModel = require('../models/NotesModel.js'); 


//Note as I was going through the document I was checking 
//and re doing the code so that I can debug the errors and this what i did



// Create a new Note
router.post('/notes', (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }

    const note = new noteModel({
        noteTitle: req.body.title || "Untitled Note",
        noteDescription: req.body.content,
        priority: req.body.priority || "MEDIUM"
    });

    note.save()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
});

// Retrieve all Notes
router.get('/notes', (req, res) => {
    noteModel.find()
        .then(notes => res.send(notes))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
});

// Retrieve a single Note with noteId
router.get('/notes/:noteId', (req, res) => {
    noteModel.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " 
                    + req.params.noteId
                });
            }
            res.send(note);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving note with id " 
                + req.params.noteId
            });
        });
});

// Update a Note with noteId
router.put('/notes/:noteId', (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }

    noteModel.findByIdAndUpdate(req.params.noteId, {
        noteTitle: req.body.title || "Untitled Note",
        noteDescription: req.body.content,
        priority: req.body.priority || "MEDIUM",
        dateUpdated: Date.now()
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " 
                    + req.params.noteId
                });
            }
            res.send(note);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating note with id " 
                + req.params.noteId
            });
        });
});

// Delete a Note with noteId
router.delete('/notes/:noteId', (req, res) => {
    noteModel.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id "
                     + req.params.noteId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete note with id " 
                + req.params.noteId
            });
        });
});

// Export the router
module.exports = router;

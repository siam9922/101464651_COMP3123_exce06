const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated

// Create Note Schema with the required fields
const NoteSchema = mongoose.Schema({
    // Title of the note, required field
    noteTitle: {
        type: String, 
        required: true 
    },
    // Description of the note, required field
    noteDescription: {
        type: String, 
        required: true 
    },
    // Priority of the note (Can be HIGH, LOW, or MEDIUM), defaults to MEDIUM
    priority: {
        type: String, 
        enum: ['HIGH', 'LOW', 'MEDIUM'], 
        default: 'MEDIUM' 
    },
    // Date the note was added, defaults to the current date and time
    dateAdded: {
        type: Date, 
        default: Date.now 
    },
    // Date the note was last updated, defaults to the current date and time
    dateUpdated: {
        type: Date, 
        default: Date.now 
    }
});

// Export the Note model so it can be used in other parts of the app
module.exports = mongoose.model('Note', NoteSchema);


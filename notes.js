/*
    Library of function to add, read, remove and list notes    
*/
const fs = require('fs');
const fileName = 'notes-data.json';

var saveNotes = (notes) => {
    var notesString = JSON.stringify(notes);
    fs.writeFileSync(fileName,notesString);
};

var getNotes = () => {
    try {
        var notesData = fs.readFileSync(fileName,{encoding: 'utf8'});
        return JSON.parse(notesData);
    } catch(e) {
    }
};
var addNote = (title, body) => {
    let notes=getNotes() || [];
    // Test to see if note already exists

    if(notes && notes.filter(note => note.title === title).length > 0) {
        console.log('Note already exists');
    } else {
        notes.push({title, body});
        saveNotes(notes);
    }
};

var readNote = (title) => {
    let notes=getNotes() || [];
    if(notes.length > 0) {
        return notes.filter(note => note.title === title)[0];
    }
};

var removeNote = (title) => {
    let notes=getNotes() || [];
    if(notes && notes.filter(note => note.title === title).length > 0) {
        var newNotes = notes.filter(note => note.title !== title);
        saveNotes(newNotes);
    }
};

var getAll = () => {
    let notes=getNotes() || [];
    return notes;
};

var showNote = (note) => {
    console.log('----');
    console.log(`title: ${note.title}`);
    console.log(`body: ${note.body}`);
};

module.exports = {
    addNote,
    readNote,
    removeNote,
    getAll,
    showNote
};
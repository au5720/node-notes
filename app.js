/*
  Author: Jennifer Morgan
  Date: 20-Sept-2018
  Purpose: Program to get familiar with JS and node.js
*/

const fs = require('fs');
const yargs = require('yargs');

const notes = require('./notes');
const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
const argv = yargs
  .command('add','Add a new note',{
    title: titleOptions,
    body: {
      describe: 'Body of note',
      demand: true,
      alias: 'b'
    }
  })
  .command('read','Read a note',{ title: titleOptions })
  .command('remove','Remove a note',{ title: titleOptions })
  .command('list','List all note(s)')
  .help()
  .argv;

let command = argv._[0];

debugger;

if(command === 'add'){
  notes.addNote(argv.title, argv.body);  
} else if(command === 'read') {
  var note = notes.readNote(argv.title);
  if(note) {
    console.log('Read a note');
    notes.showNote(note);  
  } else {
    console.log('Note not found');
  }
} else if(command === 'remove') {  
  notes.removeNote(argv.title);  
  console.log('Removed a note');
} else if(command === 'list') {
  var allNotes=notes.getAll();
  if(allNotes.length > 0) {
    console.log('All notes(s)');
    allNotes.map( note => notes.showNote(note));
  } else {
    console.log('No notes(s) on files yet');
  }
  
} else {
  console.log('Command not recognised');
}

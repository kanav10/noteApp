// console.log('starting  app.js.');

const fs= require('fs');
const _=require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
// const argv= yargs.argv; this is the old method before chaining property calls is added
const titleOptions ={
    describe:'Title of the note',
    demand: true,
    alias:'t'
};
const bodyOptions ={
    describe :'Add the body of the note',
    demand:true,
    alias:'b'
};

const argv = yargs
.command('add','Add a new note',{
    title : titleOptions,
    body  : bodyOptions 
})
.command('list','List all the notes')
.command('read','Read a note',{
    title : titleOptions
})
.command('delete','Deleting a Note',{
    title: titleOptions
})
.help()
.argv;
var command = argv._[0];


// console.log('Command:',command);

// console.log('yargs',argv);

if(command === 'add'){
    // console.log('adding new items');
    var note=notes.addNote(argv.title, argv.body);//this variable created is storing the value returned from notes.js addNote function
    if(note){
        console.log('title and body created');
        notes.logNote(note);
    }
    else{
        console.log(`sorry the title is already ${argv.title} is already in use`);
    }
}
else if(command === 'list'){
    var allNotes=notes.getAll();
    console.log(`printing ${allNotes.length} note(s).`);
    allNotes.forEach((note)=>notes.logNote(note)); 
    
}
else if(command === 'read'){
    var note =notes.getNote(argv.title);
    if(note){
     notes.logNote(note);
    }
    else{
        console.log('sorry the not was not found');
    }
}
else if(command === 'delete'){
    var noteRemoved=notes.removeNote(argv.title);//returning a boolian value
    //using the ternary operator
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
}
else{
    console.log('an invalid command has been entered');
}
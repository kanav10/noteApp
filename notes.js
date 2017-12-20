// console.log('starting notes.js');
// console.log(module);
//one way of exporting the modules=
// module.exports.age= 20;
// module.exports.addNote = ()=>{
//     console.log('add note function is called');
//     return 'New Note';
// };
// var a;
// var b;
// module.exports.add = (a,b)=>{
//     return a+b;
// };
//another way of exporting the module
const fs=require('fs');

var fetchNotes = ()=>{
    try {
        var notesString = fs.readFileSync('notes-data.json');
        //storing the parsed value in the array so it does not get deleted
        return JSON.parse(notesString);
    
    }catch(e){
        return [];
    }
};
var saveNotes = (notes)=>{
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));    
};


var addNote=(title,body)=>{
    var notes = fetchNotes();
    var note={
        title,
        body
    }
    var duplicateNotes = notes.filter((note)=>{
        return note.title === title;
    });

    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }    

};

var getAll =()=>{
    return fetchNotes();
};

var getNote =(title)=>{
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note)=>note.title===title);
    return filteredNotes[0];
};

var removeNote=(title)=>{
    var notes= fetchNotes();
    
    //filtering the notes !== will fill the removing notes with all the title that is not equal to title
    var filteredNotes = notes.filter((note)=> note.title !== title);
    //saving the new notes array
    saveNotes(filteredNotes);
    //if not equal true=note was removed if true=equal no note was removed
    return notes.length !== filteredNotes.length;
};

var logNote=(note)=>{
    console.log('---');
    console.log(`title :${note.title}\n`);
    console.log(`body:${note.body}`);
};



module.exports ={
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};
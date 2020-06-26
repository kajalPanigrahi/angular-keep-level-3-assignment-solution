import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
  note : Note;
  errMessage: string;
  notes: Array<Note>;

  constructor(private noteService : NotesService) {
  }

  ngOnInit() {
    this.note = new Note();
    this.notes = [];
    
  }

  takeNote(){
    if((this.note.title === undefined || this.note.title === '') && (this.note.text === undefined || this.note.text === '')){
      this.errMessage = 'Title and Text both are required fields';
    }  
    else if(this.note.title === undefined || this.note.title === ''){
      this.errMessage = 'Title is required';
    }
    else if(this.note.text === undefined || this.note.text === ''){
      this.errMessage = 'Text is required';
    }    
    else{
      this.errMessage='';
    }

    if(this.errMessage === '' || this.errMessage === undefined){
      this.errMessage = '';
      this.notes.push(this.note);

      this.noteService.addNote(this.note).subscribe(addedNote =>{
        this.note = new Note();    
      },error =>{
        this.errMessage=error.message;
        const index = this.notes.findIndex(note => note.id === this.note.id);
        this.notes.splice(index,1);
      })
    }    
  }
}

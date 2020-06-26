import { Component } from '@angular/core';
import {Note} from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent {
  note : Note;
  notes: Array<Note>;
  errorMessage : string;

  constructor(private noteService : NotesService) { 
    this.note = new Note();
    this.notes = [];
  }

  ngOnInit() {
    this.noteService.getNotes().subscribe(notesListResponse =>{
      this.notes = notesListResponse;
    },
    error =>{
      this.errorMessage = error.message;
    })
  }
}

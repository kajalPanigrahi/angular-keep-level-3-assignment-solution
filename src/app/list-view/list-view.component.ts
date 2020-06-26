import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  errorMessage : string;
  constructor(private noteService : NotesService) { 
    this.notStartedNotes = [];
    this.startedNotes = [];
    this.completedNotes = [];
  }

  ngOnInit() {
    this.noteService.getNotes().subscribe(notesListResponse =>{      
      this.notStartedNotes=notesListResponse.filter(note=>note.state==='not-started');
      this.startedNotes=notesListResponse.filter(note=>note.state==='started');
      this.completedNotes=notesListResponse.filter(note=>note.state==='completed');
    },
    error =>{
      this.errorMessage = error.message;
    })
  }
}

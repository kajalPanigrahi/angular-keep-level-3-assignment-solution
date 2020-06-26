import { Component, Input } from '@angular/core';
import { Note } from '../note';
import { MatDialog } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input()
  note : Note;
 
  constructor(private dialog : MatDialog, private router:RouterService){}

  editNote(noteId : number){
    this.router.routeToEditNoteView(noteId);
  }
}

import { Component, Inject } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  constructor(public dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    public noteService : NotesService) { 
      this.note =  this.noteService.getNoteById(this.data);
      if(this.note==null){
        this.note=new Note();
      }
  }
  
  onSave() {
    let editedNote : Note = new Note();
    editedNote.id = this.note.id;
    editedNote.title = this.note.title;
    editedNote.text = this.note.text;
    editedNote.state=this.note.state;
    this.errMessage = '';
    this.noteService.editNote(editedNote).subscribe(res =>{
      this.dialogRef.close();
    },error =>{
      this.errMessage=error.message;
    });
  }
}

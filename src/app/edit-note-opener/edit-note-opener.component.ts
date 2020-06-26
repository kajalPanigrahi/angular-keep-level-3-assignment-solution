import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent {
  noteId : number;
  constructor(private activatedRoute : ActivatedRoute, 
              public dialog: MatDialog,
              public routerService : RouterService) { 
    this.activatedRoute.params.subscribe(param => {
      this.noteId = param.noteId;
    } );

    this.dialog.open(EditNoteViewComponent,{
      data : this.noteId
    }).afterClosed().subscribe(res =>{
      this.routerService.routeBack();
    })
    
  }
}

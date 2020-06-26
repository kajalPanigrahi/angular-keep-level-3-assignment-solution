import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {NotesService} from './services/notes.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { FormsModule } from '@angular/forms';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { NoteComponent } from './note/note.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes:Routes = [
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent,canActivate:[CanActivateRouteGuard],
    children:[
      {path:'view/noteview',component:NoteViewComponent},
      {path:'view/listview',component:ListViewComponent},
      {path:'note/:noteId/edit',component:EditNoteOpenerComponent,
      outlet:'noteEditOutlet'},
      {path:'',redirectTo:'view/noteview',pathMatch:'full'}
    ]

  },
  {path:'',redirectTo:'login',pathMatch:'full'}
]
@NgModule({
  declarations: [ 
    AppComponent,
    HeaderComponent,
    LoginComponent,
    NoteComponent,
    DashboardComponent,
    NoteTakerComponent,
    NoteViewComponent,
    ListViewComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent
  ],
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ NotesService, AuthenticationService, RouterService, CanActivateRouteGuard],
  bootstrap: [ AppComponent],
  entryComponents: [EditNoteViewComponent ]
})

export class AppModule { }

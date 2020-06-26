import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(private http: HttpClient,private authService : AuthenticationService) { 
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
  }
  
  fetchNotesFromServer() {
    return this.http.get<Array<Note>>('http://localhost:3000/api/v1/notes',{
      headers:new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(
      notesResponse =>{
        this.notes = notesResponse;
        this.notesSubject.next(this.notes);
      },
      error=>{
        this.notesSubject.next(error);
      }
    );
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>('http://localhost:3000/api/v1/notes',note,{
      headers:new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
    }).pipe(
       tap(addedNote =>{
        this.notes.push(addedNote);
        this.notesSubject.next(this.notes);
      })
    )
  }

  editNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`,note,{
      headers:new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
   
    }).pipe(
      tap(editeNote =>{
       const note = this.notes.find(note => note.id === editeNote.id);
       Object.assign(note,editeNote);
       this.notesSubject.next(this.notes);
     })
   )
  }

  getNoteById(noteId): Note {
    return this.notes.find(note => note.id == noteId);
  }
}

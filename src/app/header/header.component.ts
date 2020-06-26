import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  isNoteView = true;
  constructor(public routerService : RouterService){
    
  }

  routeToNoteView(){
    this.routerService.routeToNoteView();
    this.isNoteView=true;
  }

  routeToListView(){
    this.routerService.routeToListView();
    this.isNoteView=false;    
  }
}

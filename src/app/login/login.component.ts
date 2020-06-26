import { Component } from '@angular/core';
import { FormControl} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {RouterService} from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = new FormControl();
    password = new FormControl();
    submitMessage: string;
    constructor(private authenticationService : AuthenticationService, 
      private router: RouterService){
  
    }

    loginSubmit() {
      //Validate this user against the Server
      //get the token and store this in my localStorage
      //Navigate him to dashboard page
      let userDtls={
        username: this.username.value,
        password: this.password.value
      };
      this.authenticationService.authenticateUser(userDtls).subscribe(res =>{
        this.authenticationService.setBearerToken(res['token']);
        this.router.routeToDashboard();
      },err =>{
        if(err.error!=undefined && err.error!=''){
          this.submitMessage=err.error.message;        
        }
        else{
          this.submitMessage=err.message;        
        }        
      })
    }
}

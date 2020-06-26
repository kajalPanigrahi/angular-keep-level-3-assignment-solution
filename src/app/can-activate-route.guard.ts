import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, 
    private routerService : RouterService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.authenticationService.isUserAuthenticated(this.authenticationService.getBearerToken())
    .then((authStatus)=>{
      if(!authStatus){
        this.routerService.routeToLogin();
      }
      return authStatus;
    })
    
    return true;
  }
}

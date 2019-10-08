import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private auth: AuthServiceService, private router: Router){}
  canActivate(): boolean{
    if(this.auth.getisLoggedIn())
    return true;
    else
    {
      this.router.navigate(['/login']);
    }
  }
}

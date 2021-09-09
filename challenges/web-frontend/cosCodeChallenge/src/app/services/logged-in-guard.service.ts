import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {TokenStorageService} from './token-storage.service'


@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardService {

  constructor(public auth:TokenStorageService,public router:Router) { }
  canActivate():boolean{
    if(this.auth.isAuthenticated()){
      this.router.navigate(['/']);
      return false;
    }
    return true
  }
}

import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router : Router) { }
  canActivate(next : ActivatedRouteSnapshot, state : RouterStateSnapshot){
    if(localStorage.getItem('currentUser')){
      return true;
    } else {
      this.router.navigate([''])
      return false;
    }
  }

}

export class AuthGuardService2 implements CanActivate {
  constructor(private router : Router) { }
  canActivate(next : ActivatedRouteSnapshot, state : RouterStateSnapshot){
    if(localStorage.getItem('currentUser')){
      return false;
    } else {
      this.router.navigate([''])
      return true;
    }
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  logi : string;
  helper = new JwtHelperService();
  constructor(private http:HttpClient, private router : Router) { }

  loginWebService(login, password){
      let user : User = new User();
      user.login = login;
      user.motDePasse = password;
      return this.http.post("http://localhost:8080/user/login",user).pipe();
  }

  login(login, password){
    this.loginWebService(login, password).subscribe(res => {
      if (res != null){
        localStorage.setItem('currentUser', res['token']);
        this.logi = this.helper.decodeToken(localStorage.getItem('currentUser'))['sub'];
        this.notifsucces();
        window.location.href = "http://localhost:4200/patient";
      }else{
        this.notifechec2();
      }
    });
  }

  logout(){
    localStorage.removeItem('currentUser');
  }

  notifsucces() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Vous êtes connecté en tant que '+ this.logi,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  notifechec2() {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Mauvaise combinaison login + mdp',
      showConfirmButton: false,
      timer: 1500,
    })
  }

}

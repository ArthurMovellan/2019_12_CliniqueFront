import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from "../models/user"
import { UserService } from "../services/user/user.service"
import { AuthentificationService } from "../services/authentification.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.css']
})
export class PageAccueilComponent implements OnInit {

  nouveauUser: User = new User();
  userForm: FormGroup;
  submitted = false;

  constructor(private userService: UserService, private authentificationService : AuthentificationService, private formBuilder: FormBuilder, private router : Router) { }

  get f() {return this.userForm.controls};

  ngOnInit() {
    if(localStorage.getItem("currentUser")){
      this.router.navigate(['\patient'])
    }
    this.userForm = this.formBuilder.group({
      login: ['', Validators.required],
      motDePasse: ['', Validators.required],
    })
  }

  onSubmit(){
    this.submitted=true;
    if (this.userForm.invalid){
      return;
    } else{
      this.verifUser();
    }
  }

  onReset(){ //pour RAZ le formulaire
    this.submitted=false;
    this.userForm.reset;
  }

  verifUser() {
    this.authentificationService.login(this.nouveauUser.login, this.nouveauUser.motDePasse);
  }

}


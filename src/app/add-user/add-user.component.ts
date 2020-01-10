import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  nouveauUser: User = new User();
  mdp1:string;
  mdp2:string;
  userForm: FormGroup;
  submitted = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router : Router) { }

  get f() {return this.userForm.controls};

  ngOnInit() {
    if(localStorage.getItem("currentUser")){
      this.router.navigate(['\patient'])
    }
    this.userForm = this.formBuilder.group({
      login: ['', Validators.required],
      mdp1: ['', Validators.required],
      mdp2: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  verifmdp(){
    if(this.mdp1 == this.mdp2){
      this.nouveauUser.motDePasse = this.mdp1;
      return true;
    }else{
      return false;
    }
  }

  onSubmit(){
    this.submitted=true;
    if (this.userForm.invalid){
      return;
    } else{
      if(this.verifmdp()){
        this.ajoutUser();
      }else{
        this.notifechecmdp();
      }
    }
  }

  onReset(){ //pour RAZ le formulaire
    this.submitted=false;
    this.userForm.reset;
  }

  ajoutUser() {
    this.userService.add(this.nouveauUser).subscribe(res => {
      if (res){
        this.notifsucces();
      }else{
        this.notifechec();
      }
    });
  }

  redirection() {
    window.location.href = "/listetat";
  }

  notifsucces() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'User ajouté!',
      showConfirmButton: false,
      timer: 1500,
      onClose: this.redirection
    })
  }

  notifechec(){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Le login entré existe déjà! Veuillez entrer un autre login ou vous connecter directement',
      showConfirmButton: false,
      timer: 1500
    })
  }

  notifechecmdp(){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Les mots de passe entrés ne correspondent pas!',
      showConfirmButton: false,
      timer: 1500
    })
  }

}

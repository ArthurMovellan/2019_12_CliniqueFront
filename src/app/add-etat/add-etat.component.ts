import { Component, OnInit } from '@angular/core';
import { Etat } from "../models/etat";
import { EtatService } from '../services/etat/etat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-etat',
  templateUrl: './add-etat.component.html',
  styleUrls: ['./add-etat.component.css']
})

export class AddEtatComponent implements OnInit {

  nouveauEtat: Etat = new Etat();
  etatForm: FormGroup;
  submitted = false;

  constructor(private etatService: EtatService, private formBuilder: FormBuilder) { }

  get f() {return this.etatForm.controls};

  ngOnInit() {
    this.etatForm = this.formBuilder.group({
      libelle: ['', Validators.required],
    })
  }

  onSubmit(){
    this.submitted=true;
    if (this.etatForm.invalid){
      return;
    } else{
      this.ajoutEtat();
    }
  }

  onReset(){ //pour RAZ le formulaire
    this.submitted=false;
    this.etatForm.reset;
  }

  ajoutEtat() {
    this.etatService.add(this.nouveauEtat).subscribe(res =>{
      if (res){
        this.notif();
      }
    });
  }

  redirection() {
    window.location.href = "/etat";
  }

  notif() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Etat ajouté!',
      showConfirmButton: false,
      timer: 1500,
      onClose: this.redirection
    })
  }

}

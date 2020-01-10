import { Component, OnInit } from '@angular/core';
import { Medecin } from "../models/medecin";
import { MedecinService } from '../services/medecin/medecin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { Service } from '../models/service';
import { ServiceService } from '../services/service/service.service';

@Component({
  selector: 'app-add-medecin',
  templateUrl: './add-medecin.component.html',
  styleUrls: ['./add-medecin.component.css']
})

export class AddMedecinComponent implements OnInit {

  nouveauMedecin: Medecin = new Medecin();
  nouveauService: Service = new Service();
  medecinForm: FormGroup;
  submitted = false;
  listService: Service[] = [];

  constructor(private medecinService: MedecinService, private serviceService: ServiceService, private formBuilder: FormBuilder) { }

  get f() {return this.medecinForm.controls};

  ngOnInit() {
    this.medecinForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      service: ['', Validators.required]
    });
    this.serviceService.getAll().subscribe(data => {
      this.listService = data;
    });
  }

  onSubmit(){
    this.submitted=true;
    if (this.medecinForm.invalid){
      return;
    } else{
      this.ajoutMedecin();
    }
  }

  onReset(){ //pour RAZ le formulaire
    this.submitted=false;
    this.medecinForm.reset;
  }

  ajoutMedecin() {
    this.medecinService.add(this.nouveauMedecin).subscribe(res  => {
      console.log(res)
      if (res['id']!=null) {
        this.medecinService.affecterService(res['id'],this.nouveauService.id).subscribe(res => {
          if (res){
            this.notif();
          }
        })
      }
    })
  }

  redirection() {
    window.location.href = "/medecin";
  }

  notif() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Médecin ajouté!',
      showConfirmButton: false,
      timer: 1500,
      onClose: this.redirection
    })
  }

}

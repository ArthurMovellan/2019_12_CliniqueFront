import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Medecin } from '../models/medecin';
import { MedecinService } from '../services/medecin/medecin.service';
import { Service } from '../models/service';
import { ServiceService } from '../services/service/service.service';

@Component({
  selector: 'app-update-medecin',
  templateUrl: './update-medecin.component.html',
  styleUrls: ['./update-medecin.component.css']
})
export class UpdateMedecinComponent implements OnInit {

  id: number;
  medecincourant: Medecin = new Medecin();
  servicecourant: Service = new Service();
  listService: Service[] = [];
  medecinForm: FormGroup;
  submitted = false;

  constructor(private medecinService: MedecinService, private serviceService: ServiceService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  get f() { return this.medecinForm.controls };

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.medecinService.getbyid(this.id).subscribe(data => {
      this.medecincourant = data;
      this.servicecourant = this.medecincourant.service;
    });
    this.medecinForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      service: ['', Validators.required]
    });
    this.serviceService.getAll().subscribe(data => {
      this.listService = data;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.medecinForm.invalid) {
      return;
    } else {
      this.modifierMedecin();
    }
  }

  onReset() {
    this.submitted = false;
    this.medecinForm.reset;
  }

  modifierMedecin() {
    this.medecinService.update(this.id, this.medecincourant).subscribe(res =>{
      if (res['id'] != null){
        this.medecinService.affecterService(this.id, this.servicecourant.id).subscribe(res=>{
          if (res) {
            this.notif();
          }
        })
      }
    });
  }

  redirection() {
    window.location.href = "/medecin";
  }

  notif() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Médecin modifié!',
      showConfirmButton: false,
      timer: 1500,
      onClose: this.redirection
    })
  }

}

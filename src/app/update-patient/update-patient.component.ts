import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient/patient.service';
import { Etat } from '../models/etat';
import { EtatService } from '../services/etat/etat.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {

  id: number;
  patientcourant: Patient = new Patient();
  etatcourant: Etat = new Etat();
  listEtat: Etat[] = [];
  patientForm: FormGroup;
  submitted = false;

  constructor(private patientService: PatientService, private etatService: EtatService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  get f() { return this.patientForm.controls };

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.patientService.getbyid(this.id).subscribe(data => {
      this.patientcourant = data;
      this.etatcourant = this.patientcourant.etat;
    });
    this.patientForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dossierMedical: ['', Validators.required],
      etat: ['', Validators.required]
    });
    this.etatService.getAll().subscribe(data => {
      this.listEtat = data;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.patientForm.invalid) {
      return;
    } else {
      this.modifierPatient();
    }
  }

  onReset() {
    this.submitted = false;
    this.patientForm.reset;
  }

  modifierPatient() {
    this.patientService.update(this.id, this.patientcourant).subscribe(res =>{
      if (res['id'] != null){
        this.patientService.affecterEtat(this.id, this.etatcourant.id).subscribe(res=>{
          if (res) {
            this.notif();
          }
        })
      }
    });
  }

  redirection() {
    window.location.href = "/patient";
  }

  notif() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Patient modifié!',
      showConfirmButton: false,
      timer: 1500,
      onClose: this.redirection
    })
  }

}

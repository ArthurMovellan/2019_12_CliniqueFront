import { Component, OnInit } from '@angular/core';
import { Patient } from "../models/patient";
import { PatientService } from '../services/patient/patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { Etat } from '../models/etat';
import { EtatService } from '../services/etat/etat.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})

export class AddPatientComponent implements OnInit {

  nouveauPatient: Patient = new Patient();
  nouveauEtat: Etat = new Etat();
  patientForm: FormGroup;
  submitted = false;
  listEtat: Etat[] = [];

  constructor(private patientService: PatientService, private etatService: EtatService, private formBuilder: FormBuilder) { }

  get f() {return this.patientForm.controls};

  ngOnInit() {
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

  onSubmit(){
    this.submitted=true;
    if (this.patientForm.invalid){
      return;
    } else{
      this.ajoutPatient();
    }
  }

  onReset(){ //pour RAZ le formulaire
    this.submitted=false;
    this.patientForm.reset;
  }

  ajoutPatient() {
    this.patientService.add(this.nouveauPatient).subscribe(res  => {
      console.log(res)
      if (res['id']!=null) {
        this.patientService.affecterEtat(res['id'],this.nouveauEtat.id).subscribe(res => {
          console.log(res);
          if (res){
            this.notif();
          }
        })
      }
    })
  }

  redirection() {
    window.location.href = "/patient";
  }

  notif() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Patient ajouté!',
      showConfirmButton: false,
      timer: 1500,
      onClose: this.redirection
    })
  }

}

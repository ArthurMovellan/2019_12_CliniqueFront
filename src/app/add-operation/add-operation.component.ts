import { Component, OnInit } from '@angular/core';
import { Operation } from "../models/operation";
import { OperationService } from '../services/operation/operation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient/patient.service';
import { Medecin } from '../models/medecin';
import { MedecinService } from '../services/medecin/medecin.service';
import { Salle } from '../models/salle';
import { SalleService } from '../services/salle/salle.service';

@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.css']
})

export class AddOperationComponent implements OnInit {

  nouveauOperation: Operation = new Operation();
  nouveauPatient: Patient = new Patient();
  nouveauMedecin: Medecin = new Medecin();
  nouveauSalle: Salle = new Salle();
  operationForm: FormGroup;
  submitted = false;
  listPatient: Patient[] = [];
  listMedecin: Medecin[] = [];
  listSalle: Salle[] = [];
  idOperation: number;

  constructor(private operationService: OperationService, private patientService: PatientService, private medecinService: MedecinService, private salleService: SalleService, private formBuilder: FormBuilder) { }

  get f() {return this.operationForm.controls};

  ngOnInit() {
    this.operationForm = this.formBuilder.group({
      patient: ['', Validators.required],
      medecin: ['', Validators.required],
      salle: ['', Validators.required],
      date: ['', Validators.required]
    });
    this.patientService.getAll().subscribe(data => {
      this.listPatient = data;
    });
    this.medecinService.getAll().subscribe(data => {
      this.listMedecin = data;
    });
    this.salleService.getAll().subscribe(data => {
      this.listSalle = data;
    });
  }

  onSubmit(){
    this.submitted=true;
    if (this.operationForm.invalid){
      return;
    } else{
      this.ajoutOperation();
    }
  }

  onReset(){ //pour RAZ le formulaire
    this.submitted=false;
    this.operationForm.reset;
  }

  ajoutOperation() {
    this.operationService.add(this.nouveauOperation).subscribe(res  => {
      if (res['id']!=null) {
        this.idOperation = res['id'];
        this.operationService.affecterPatient(this.idOperation,this.nouveauPatient.id).subscribe(res => {
          if (res){
            this.operationService.affecterMedecin(this.idOperation, this.nouveauMedecin.id).subscribe(res => {
              if (res){
                this.operationService.affecterSalle(this.idOperation, this.nouveauSalle.id).subscribe(res => {
                  if (res){
                    this.notif();
                  }
                })
              }
            })
          }
        })
      }
    })
  }
  
  redirection() {
    window.location.href = "/operation";
  }

  notif() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Opération ajoutée!',
      showConfirmButton: false,
      timer: 1500,
      onClose: this.redirection
    })
  }

}

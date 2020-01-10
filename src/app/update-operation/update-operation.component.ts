import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Operation } from '../models/operation';
import { OperationService } from '../services/operation/operation.service';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient/patient.service';
import { Medecin } from '../models/medecin';
import { MedecinService } from '../services/medecin/medecin.service';
import { Salle } from '../models/salle';
import { SalleService } from '../services/salle/salle.service';

@Component({
  selector: 'app-update-operation',
  templateUrl: './update-operation.component.html',
  styleUrls: ['./update-operation.component.css']
})
export class UpdateOperationComponent implements OnInit {

  id: number;
  operationcourant: Operation = new Operation();
  patientcourant: Patient = new Patient();
  medecincourant: Medecin = new Medecin();
  sallecourant: Salle = new Salle();
  listPatient: Patient[] = [];
  listMedecin: Medecin[] = [];
  listSalle: Salle[] = [];
  operationForm: FormGroup;
  submitted = false;

  constructor(private operationService: OperationService, private patientService: PatientService, private medecinService: MedecinService, private salleService: SalleService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  get f() { return this.operationForm.controls };

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.operationService.getbyid(this.id).subscribe(data => {
      this.operationcourant = data;
      this.patientcourant = this.operationcourant.patient;
      this.medecincourant = this.operationcourant.medecin;
      this.sallecourant = this.operationcourant.salle;
    });
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
    })
    this.salleService.getAll().subscribe(data =>{
      this.listSalle = data;
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.operationForm.invalid) {
      return;
    } else {
      this.modifierOperation();
    }
  }

  onReset() {
    this.submitted = false;
    this.operationForm.reset;
  }

  modifierOperation() {
    this.operationService.update(this.id, this.operationcourant).subscribe(res =>{
      if (res['id'] != null){
        this.operationService.affecterPatient(this.id, this.patientcourant.id).subscribe(res=>{
          if (res) {
            this.operationService.affecterMedecin(this.id, this.medecincourant.id).subscribe(res =>{
              if (res) {
                this.operationService.affecterSalle(this.id, this.sallecourant.id).subscribe(res => {
                  if (res) {
                    this.notif();
                  }
                })
              }
            })
          }
        })
      }
    });
  }

  redirection() {
    window.location.href = "/operation";
  }

  notif() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Opération modifiée!',
      showConfirmButton: false,
      timer: 1500,
      onClose: this.redirection
    })
  }

}

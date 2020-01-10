import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { Salle } from '../models/salle';
import { SalleService } from '../services/salle/salle.service';

@Component({
  selector: 'app-add-salle',
  templateUrl: './add-salle.component.html',
  styleUrls: ['./add-salle.component.css']
})

export class AddSalleComponent implements OnInit {

  nouveauSalle: Salle = new Salle();
  salleForm: FormGroup;
  submitted = false;

  constructor(private salleService: SalleService, private formBuilder: FormBuilder) { }

  get f() {return this.salleForm.controls};

  ngOnInit() {
    this.salleForm = this.formBuilder.group({
      numero: ['', Validators.required],
      type: ['', Validators.required],
    })
  }

  onSubmit(){
    this.submitted=true;
    if (this.salleForm.invalid){
      return;
    } else{
      this.ajoutSalle();
    }
  }

  onReset(){ //pour RAZ le formulaire
    this.submitted=false;
    this.salleForm.reset;
  }

  ajoutSalle() {
    this.salleService.add(this.nouveauSalle).subscribe(res => {
      if (res){
        this.notif();
      }
    });
  }

  redirection() {
    window.location.href = "/salle";
  }

  notif() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Salle ajoutée!',
      showConfirmButton: false,
      timer: 1500,
      onClose: this.redirection
    })
  }

}

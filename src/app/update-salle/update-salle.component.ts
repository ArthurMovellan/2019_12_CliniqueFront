import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Salle } from '../models/salle';
import { SalleService } from '../services/salle/salle.service';

@Component({
  selector: 'app-update-salle',
  templateUrl: './update-salle.component.html',
  styleUrls: ['./update-salle.component.css']
})
export class UpdateSalleComponent implements OnInit {

  id: number;
  sallecourant: Salle = new Salle();
  salleForm: FormGroup;
  submitted = false;

  constructor(private salleService: SalleService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  get f() { return this.salleForm.controls };

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.salleService.getbyid(this.id).subscribe(data => {
      this.sallecourant = data;
    });
    this.salleForm = this.formBuilder.group({
      numero: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.salleForm.invalid) {
      return;
    } else {
      this.modifierSalle();
    }
  }

  onReset() {
    this.submitted = false;
    this.salleForm.reset;
  }

  modifierSalle() {
    this.salleService.update(this.id, this.sallecourant).subscribe(res => {
      if (res) {
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
      title: 'Salle modifiée!',
      showConfirmButton: false,
      timer: 1500,
      onClose: this.redirection
    })
  }

}

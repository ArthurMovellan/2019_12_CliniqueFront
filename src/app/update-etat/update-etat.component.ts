import { Component, OnInit } from '@angular/core';
import { Etat } from '../models/etat';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EtatService } from '../services/etat/etat.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-etat',
  templateUrl: './update-etat.component.html',
  styleUrls: ['./update-etat.component.css']
})
export class UpdateEtatComponent implements OnInit {

  id: number;
  etatcourant: Etat = new Etat();
  etatForm: FormGroup;
  submitted = false;

  constructor(private etatService: EtatService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  get f() { return this.etatForm.controls };

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.etatService.getbyid(this.id).subscribe(data => {
      this.etatcourant = data;
    });
    this.etatForm = this.formBuilder.group({
      libelle: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.etatForm.invalid) {
      return;
    } else {
      this.modifierEtat();
    }
  }

  onReset() {
    this.submitted = false;
    this.etatForm.reset;
  }

  modifierEtat() {
    this.etatService.update(this.id, this.etatcourant).subscribe(res => {
      if (res) {
        this.notif();
      }
    });
  }

  redirection() {
    window.location.href = "/listetat";
  }

  notif() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Etat modifié!',
      showConfirmButton: false,
      timer: 1500,
      onClose: this.redirection
    })
  }

}

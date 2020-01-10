import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Service } from '../models/service';
import { ServiceService } from '../services/service/service.service';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit {

  id: number;
  servicecourant: Service = new Service();
  serviceForm: FormGroup;
  submitted = false;

  constructor(private serviceService: ServiceService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  get f() { return this.serviceForm.controls };

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.serviceService.getbyid(this.id).subscribe(data => {
      this.servicecourant = data;
    });
    this.serviceForm = this.formBuilder.group({
      nom: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.serviceForm.invalid) {
      return;
    } else {
      this.modifierService();
    }
  }

  onReset() {
    this.submitted = false;
    this.serviceForm.reset;
  }

  modifierService() {
    this.serviceService.update(this.id, this.servicecourant).subscribe(res => {
      if (res){
        this.notif();
      }
    });
  }

  redirection() {
    window.location.href = "/service";
  }

  notif() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Service modifié!',
      showConfirmButton: false,
      timer: 1500,
      onClose: this.redirection
    })
  }

}

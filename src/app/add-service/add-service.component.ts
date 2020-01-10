import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { Service } from '../models/service';
import { ServiceService } from '../services/service/service.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})

export class AddServiceComponent implements OnInit {

  nouveauService: Service = new Service();
  serviceForm: FormGroup;
  submitted = false;

  constructor(private serviceService: ServiceService, private formBuilder: FormBuilder) { }

  get f() {return this.serviceForm.controls};

  ngOnInit() {
    this.serviceForm = this.formBuilder.group({
      nom: ['', Validators.required],
    })
  }

  onSubmit(){
    this.submitted=true;
    if (this.serviceForm.invalid){
      return;
    } else{
      this.ajoutService();
    }
  }

  onReset(){ //pour RAZ le formulaire
    this.submitted=false;
    this.serviceForm.reset;
  }

  ajoutService() {
    this.serviceService.add(this.nouveauService).subscribe(res => {
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
      title: 'Service ajouté!',
      showConfirmButton: false,
      timer: 1500,
      onClose: this.redirection
    })
  }

}

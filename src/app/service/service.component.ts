import { Component, OnInit } from '@angular/core';
import { Service } from "../models/service"
import { ServiceService } from "../services/service/service.service"
import Swal from 'sweetalert2'

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  listServices : Service[] = [];

  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
    this.serviceService.getAll().subscribe(data => {
      this.listServices = data;
    })
  }

  delService(id: number, index) {
    this.serviceService.delete(id).subscribe((res: Response) => {
      if (!res) {
        Swal.fire(
                "Le service n'a pas pu être supprimé car un médecin appartient à ce service",
              )
      } else {
        if (res){
          this.listServices.splice(index, 1);
          Swal.fire(
                    'Service supprimé!',
                  )
        }
      }
    });
    
  }

  askfordel(id: number, index) {
    this.notif(id, index);
  }

  notif(id: number, index) {
    Swal.fire({
      title: 'Etes-vous sûr ?',
      text: "La suppression de ce service sera définitive",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je veux le supprimer'
    }).then((result) => {
      if (result.value) {
        this.delService(id, index)
      }
    })
  }   

}

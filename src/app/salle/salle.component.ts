import { Component, OnInit } from '@angular/core';
import { Salle } from "../models/salle"
import { SalleService } from "../services/salle/salle.service"
import Swal from 'sweetalert2'

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent implements OnInit {

  listSalles : Salle[] = [];

  constructor(private salleService: SalleService) { }

  ngOnInit() {
    this.salleService.getAll().subscribe(data => {
      this.listSalles = data;
    })
  }

  delSalle(id: number, index) {
    this.salleService.delete(id).subscribe((res: Response) => {
      if (!res) {
        Swal.fire(
                "La salle n'a pas pu être supprimée car une opération a eu lieu dans cette salle",
              )
      } else {
        if (res){
          this.listSalles.splice(index, 1);
          Swal.fire(
                    'Salle supprimée!',
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
      text: "La suppression de cette salle sera définitive",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je veux la supprimer'
    }).then((result) => {
      if (result.value) {
        this.delSalle(id, index)
      }
    })
  }   

}

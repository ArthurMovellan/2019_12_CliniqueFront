import { Component, OnInit } from '@angular/core';
import { Medecin } from "../models/medecin"
import { MedecinService } from "../services/medecin/medecin.service"
import Swal from 'sweetalert2'

@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})
export class MedecinComponent implements OnInit {

  listMedecins : Medecin[] = [];

  constructor(private medecinService: MedecinService) { }

  ngOnInit() {
    this.medecinService.getAll().subscribe(data => {
      this.listMedecins = data;
    })
  }

  delMedecin(id: number, index) {
    this.medecinService.delete(id).subscribe((res: Response) => {
      if (!res) {
        Swal.fire(
                "Le médecin n'a pas pu être supprimé car une opération a eu lieu grâce à ce médecin",
              )
      } else {
        if (res){
          this.listMedecins.splice(index, 1);
          Swal.fire(
                    'Medecin supprimé!',
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
      text: "La suppression de ce médecin sera définitive",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je veux le supprimer'
    }).then((result) => {
      if (result.value) {
        this.delMedecin(id, index)
      }
    })
  }   

}

import { Component, OnInit } from '@angular/core';
import { EtatService } from '../services/etat/etat.service';
import { Etat } from '../models/etat'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-etat',
  templateUrl: './etat.component.html',
  styleUrls: ['./etat.component.css']
})
export class EtatComponent implements OnInit {

  listEtats : Etat[] = [];

  constructor(private etatService: EtatService) { }

  ngOnInit() {
    this.etatService.getAll().subscribe(data => {
      this.listEtats = data;
    })
  }

  delEtat(id: number, index) {
    this.etatService.delete(id).subscribe((res: Response) => {
      if (!res) {
        Swal.fire(
                "L'état n'a pas pu être supprimé car un patient est dans cet état",
              )
      } else {
        if (res){
          this.listEtats.splice(index, 1);
          Swal.fire(
                    'Etat supprimé!',
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
      text: "La suppression de cet état sera définitive",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je veux le supprimer'
    }).then((result) => {
      if (result.value) {
        this.delEtat(id, index)
      }
    })
  }   

}

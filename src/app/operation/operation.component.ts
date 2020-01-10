import { Component, OnInit } from '@angular/core';
import { Operation } from "../models/operation"
import { OperationService } from "../services/operation/operation.service"
import Swal from 'sweetalert2'

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  listOperations : Operation[] = [];

  constructor(private operationService: OperationService) { }

  ngOnInit() {
    this.operationService.getAll().subscribe(data => {
      this.listOperations = data;
    })
  }

  delOperation(id: number, index) {
    this.operationService.delete(id).subscribe((res: Response) => {
      if (!res) {
        Swal.fire(
                "L'opération n'a pas pu être supprimée",
              )
      } else {
        if (res){
          this.listOperations.splice(index, 1);
          Swal.fire(
                    'Opération supprimée!',
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
      text: "La suppression de cette opération sera définitive",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je veux la supprimer'
    }).then((result) => {
      if (result.value) {
        this.delOperation(id, index)
      }
    })
  }   

}

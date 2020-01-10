import { Component, OnInit } from '@angular/core';
import { Patient } from "../models/patient"
import { PatientService } from "../services/patient/patient.service"
import Swal from 'sweetalert2'

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  listPatients : Patient[] = [];
  motRecherche : String = new String();

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.patientService.getAll().subscribe(data => {
      this.listPatients = data;
    })
  }

  delPatient(id: number, index) {
    this.patientService.delete(id).subscribe((res: Response) => {
      if (!res) {
        Swal.fire(
                "Le patient n'a pas pu être supprimé car une opération a eu lieu sur ce patient",
              )
      } else {
        if (res){
          this.listPatients.splice(index, 1);
          Swal.fire(
                    'Patient supprimé!',
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
      text: "La suppression de ce patient sera définitive",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je veux le supprimer'
    }).then((result) => {
      if (result.value) {
        this.delPatient(id, index)
      }
    })
  }   

  recherche(){
    console.log(this.motRecherche);
  }

}

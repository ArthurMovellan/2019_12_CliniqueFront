import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../../models/patient'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Patient[]>("http://localhost:8080/patient").pipe();
  }

  add(patient : Patient){
    return this.http.post("http://localhost:8080/patient", patient).pipe();
  }

  delete(id : number){
    return this.http.delete("http://localhost:8080/patient/"+ id).pipe();
  }

  getbyid(id : number){
    return this.http.get<Patient>("http://localhost:8080/patient/" + id).pipe();
  }

  update(id:number, patient:Patient){
    return this.http.put("http://localhost:8080/patient/" + id, patient).pipe();
  }

  affecterEtat(idP:number, idE:number){
    return this.http.put("http://localhost:8080/patient/"+idP+"/etat"+idE,"").pipe();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medecin } from '../../models/medecin'

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Medecin[]>("http://localhost:8080/medecin").pipe();
  }

  add(medecin : Medecin){
    return this.http.post("http://localhost:8080/medecin", medecin).pipe();
  }

  delete(id : number){
    return this.http.delete("http://localhost:8080/medecin/"+ id).pipe();
  }

  getbyid(id : number){
    return this.http.get<Medecin>("http://localhost:8080/medecin/" + id).pipe();
  }

  update(id:number, medecin:Medecin){
    return this.http.put("http://localhost:8080/medecin/" + id, medecin).pipe();
  }

  affecterService(idM: number, idS: number){
    return this.http.put("http://localhost:8080/medecin/"+idM+"/service"+idS, "").pipe();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Operation } from '../../models/operation'

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Operation[]>("http://localhost:8080/operation").pipe();
  }

  add(operation : Operation){
    return this.http.post("http://localhost:8080/operation", operation).pipe();
  }

  delete(id : number){
    return this.http.delete("http://localhost:8080/operation/"+ id).pipe();
  }

  getbyid(id : number){
    return this.http.get<Operation>("http://localhost:8080/operation/" + id).pipe();
  }

  update(id:number, operation:Operation){
    return this.http.put("http://localhost:8080/operation/" + id, operation).pipe();
  }

  affecterPatient(idO: number, idP: number){
    return this.http.put("http://localhost:8080/operation/"+idO+"/patient"+idP, "").pipe();
  }

  affecterMedecin(idO: number, idM: number){
    return this.http.put("http://localhost:8080/operation/"+idO+"/medecin"+idM, "").pipe();
  }

  affecterSalle(idO: number, idS: number){
    return this.http.put("http://localhost:8080/operation/"+idO+"/salle"+idS, "").pipe();
  }

  affecterDate(idO: number, dateStr: string){
    return this.http.put("http://localhost:8080/operation/"+idO+"/date"+dateStr, "").pipe();
  }
}

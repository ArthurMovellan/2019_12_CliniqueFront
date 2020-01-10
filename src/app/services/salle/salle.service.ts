import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Salle } from '../../models/salle'

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Salle[]>("http://localhost:8080/salle").pipe();
  }

  add(salle : Salle){
    return this.http.post("http://localhost:8080/salle", salle).pipe();
  }

  delete(id : number){
    return this.http.delete("http://localhost:8080/salle/"+ id).pipe();
  }

  getbyid(id : number){
    return this.http.get<Salle>("http://localhost:8080/salle/" + id).pipe();
  }

  update(id:number, salle:Salle){
    return this.http.put("http://localhost:8080/salle/" + id, salle).pipe();
  }
}

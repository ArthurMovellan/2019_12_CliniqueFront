import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../../models/service'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Service[]>("http://localhost:8080/service").pipe();
  }

  add(service : Service){
    return this.http.post("http://localhost:8080/service", service).pipe();
  }

  delete(id : number){
    return this.http.delete("http://localhost:8080/service/"+ id).pipe();
  }

  getbyid(id : number){
    return this.http.get<Service>("http://localhost:8080/service/" + id).pipe();
  }

  update(id:number, service:Service){
    return this.http.put("http://localhost:8080/service/" + id, service).pipe();
  }
}

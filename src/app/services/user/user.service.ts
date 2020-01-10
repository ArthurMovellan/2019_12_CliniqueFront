import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<User[]>("http://localhost:8080/user").pipe();
  }

  add(user : User){
    return this.http.post("http://localhost:8080/user", user).pipe();
  }

  delete(id : number){
    return this.http.delete("http://localhost:8080/user/"+ id).pipe();
  }

  getbyid(id : number){
    return this.http.get<User>("http://localhost:8080/user/id" + id).pipe();
  }

  update(id:number, user:User){
    return this.http.put("http://localhost:8080/user/" + id, user).pipe();
  }

  getbylogin(login: string){
    return this.http.get<User[]>("http://localhost:8080/user/login"+login).pipe();
  }

  veriflogin(user:User){
    return this.http.post("http://localhost:8080/user/login", user).pipe();
  }
}

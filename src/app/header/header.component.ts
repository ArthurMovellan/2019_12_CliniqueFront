import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private connected: boolean = false;
  private user : String;
  helper = new JwtHelperService();

  constructor(private router : Router) { }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    if(localStorage.getItem('currentUser')){
      this.connected = true;
      this.user = this.helper.decodeToken(localStorage.getItem('currentUser'))['sub'];
    }else{
      this.connected = false;
    }
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.connected = false;
    this.router.navigate(['']);
  }
}

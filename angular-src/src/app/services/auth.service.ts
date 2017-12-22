import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {tokenNotExpired} from "angular2-jwt";

@Injectable()
export class AuthService {

  constructor(private http: Http) {
  }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/register', user, {headers: headers})
    .map(res => res.json());
  }

  registerCompany(company){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/registerCompany', company, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user_id', user.id);
    localStorage.setItem('role', user.role);
  }

  logout(){
    localStorage.clear();
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  getId() {
    return localStorage.getItem('user_id');
  }

  getToken(){
    return localStorage.getItem('id_token');
  }

  /*  getUser(){
    return localStorage.getItem('user');
  }*/



  /*  getProfile(){
      let headers = new Headers();
      //this.loadToken();
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type', 'application/json');
      return this.http.get('http://localhost:3000/users/profile', {headers: headers})
        .map(res => res.json());
    }*/

}

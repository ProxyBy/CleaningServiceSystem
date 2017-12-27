import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {AuthService} from "./auth.service";

@Injectable()
export class ProfileService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }
  getProfile(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.post('http://localhost:3000/profile', user,{headers: headers})
      .map(res => res.json());
  }

  updateCompanyProfile(company){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.post('http://localhost:3000/updateCompanyProfile', company, {headers: headers})
      .map(res => res.json());
  }

  updateUserProfile(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.post('http://localhost:3000/updateUserProfile', user, {headers: headers})
      .map(res => res.json());
  }

  profileModeration(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.post('http://localhost:3000/profileModeration', user, {headers: headers})
      .map(res => res.json());
  }

  activateProfile(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.post('http://localhost:3000/activateUser', user, {headers: headers})
      .map(res => res.json());
  }

  deleteProfile(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.post('http://localhost:3000/deleteUser', user, {headers: headers})
      .map(res => res.json());
  }
}

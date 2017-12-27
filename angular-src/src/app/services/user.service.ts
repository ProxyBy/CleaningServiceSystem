import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {AuthService} from "./auth.service";

@Injectable()
export class UserService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getUsers(){
    let headers = new Headers();
    headers.append('Authorization', this.authService.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users', {headers: headers})
      .map(res => res.json());
  }
}


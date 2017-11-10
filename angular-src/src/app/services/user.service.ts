import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUsers(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users', {headers: headers})
      .map(res => res.json());
  }
}

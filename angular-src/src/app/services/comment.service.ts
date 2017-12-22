import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {AuthService} from "./auth.service";

@Injectable()
export class CommentService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  addComment(comment){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.post('http://localhost:3000/addComment', comment, {headers: headers})
      .map(res => res.json());
  }

  getRaiting(companyId){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.post('http://localhost:3000/getRaiting', {companyId}, {headers: headers})
      .map(res => res.json());
  }

  getComments(companyId){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.post('http://localhost:3000/getComments', {companyId}, {headers: headers})
      .map(res => res.json());
  }

}





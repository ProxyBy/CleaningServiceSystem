import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  constructor(private http: Http) { }

  getProfile(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/profile', user,{headers: headers})
      .map(res => res.json());
  }

  updateCompanyProfile(company){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/updateCompanyProfile', company, {headers: headers})
      .map(res => res.json());
  }

  updateUserProfile(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/updateUserProfile', user, {headers: headers})
      .map(res => res.json());
  }
}

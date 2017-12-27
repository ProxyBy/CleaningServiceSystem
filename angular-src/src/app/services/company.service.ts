import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {AuthService} from "./auth.service";

@Injectable()
export class CompanyService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }
  getCompanyList(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.get('http://localhost:3000/company', {headers: headers})
      .map(res => res.json());
  }

  getCompanyParametrizedList(params){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.post('http://localhost:3000/companyParametrizedList', params, {headers: headers})
      .map(res => res.json());
  }

  getAvailableCompanyList(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.get('http://localhost:3000/companyAvailableList', {headers: headers})
      .map(res => res.json());
  }

  getPrice(company){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.post('http://localhost:3000/getPrice', company, {headers: headers})
      .map(res => res.json());
  }
}


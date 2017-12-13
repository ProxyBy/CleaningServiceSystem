import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {

  constructor(private http: Http) { }

  getCompanyList(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/company', {headers: headers})
      .map(res => res.json());
  }

  getCompanyParametrizedList(params){
    console.log(params);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/companyParametrizedList', params, {headers: headers})
      .map(res => res.json());
  }
}


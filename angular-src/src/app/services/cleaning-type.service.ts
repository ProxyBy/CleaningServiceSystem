import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class CleaningTypeService {

  constructor(private http: Http) { }

  getCleaningTypes(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/cleaningTypes', {headers: headers})
      .map(res => res.json());
  }

  addCleaningTypes(cleaningType){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/addCleaningType', cleaningType, {headers: headers})
      .map(res => res.json());
  }

}




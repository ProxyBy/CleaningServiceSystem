import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class CommentService {

  constructor(private http: Http) { }

  addComment(comment){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/addComment', comment, {headers: headers})
      .map(res => res.json());
  }

}





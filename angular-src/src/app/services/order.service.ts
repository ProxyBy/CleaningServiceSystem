import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  constructor(private http: Http) { }

  order(order){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/order', order, {headers: headers})
      .map(res => res.json());
  }

  getCustomerOrders(userId){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/getOrders', {userId},{headers: headers})
      .map(res => res.json());
  }

  getCompanyOrders(companyId){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/getCompanyOrders', {companyId},{headers: headers})
      .map(res => res.json());
  }

  getOrderInfo(orderId){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/getOrderInfo', {orderId},{headers: headers})
      .map(res => res.json());
  }
}

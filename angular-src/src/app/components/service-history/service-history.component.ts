import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-service-history',
  templateUrl: './service-history.component.html',
  styleUrls: ['./service-history.component.css']
})
export class ServiceHistoryComponent implements OnInit {
  orders: any[]=[];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private flashMessageService: FlashMessagesService
  ){}

  ngOnInit() {
    this.orderService.getCustomerOrders(this.authService.getId()).subscribe(data => {
      if(data.success){
        this.orders = data.orders;
      } else {
        this.flashMessageService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }
}

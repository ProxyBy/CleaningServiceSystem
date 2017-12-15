import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[]=[];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.orderService.getCompanyOrders(this.authService.getId()).subscribe(data => {
      if(data.success){
        this.orders = data.orders;
      } else {
        this.flashMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  show(orderId){
    this.router.navigate(['/orderDetails', orderId]);
  }

}

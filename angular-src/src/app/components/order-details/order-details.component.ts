import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from "../../services/order.service";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: any;
  customer = {
    _id: null,
    username: null,
    email: null,
    phone: null,
  };
  order ={
    cleaningTypeName: null,
    customerId: null
  };


  constructor(
    private flashMessageService: FlashMessagesService,
    private activeRoute: ActivatedRoute,
    private orderService: OrderService,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.orderId = params['orderId'];
      this.orderService.getOrderInfo(this.orderId).subscribe(data => {
        if(data.success){
          this.order = data.order;
          this.profileService.getProfile({_id: this.order.customerId}).subscribe(data => {
            this.customer = data.user;
            console.log(this.customer);
          });
          console.log(this.order);
        } else {
          this.flashMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    });
  }

  accept(){

  }

  cancel(){

  }
}

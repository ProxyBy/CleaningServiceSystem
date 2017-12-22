import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from "../../services/order.service";
import {ProfileService} from "../../services/profile.service";
import {Md2Dialog} from "md2";

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
    customerId: null,
    status: null
  };
  rejectReason: null;
  updatedOrder = {
    email: null,
    orderId: null,
    companyId: null,
    status: null,
    rejectReason: null
  }


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
          this.updatedOrder.companyId = this.order.companyId;
          this.updatedOrder.orderId = this.order._id;
          this.updatedOrder.email = this.order.email;
          this.profileService.getProfile({_id: this.order.customerId}).subscribe(data => {
            this.customer = data.user;
          });
        } else {
          this.flashMessageService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    });
  }

  openAccept(dialog: Md2Dialog) {
    dialog.open();
  }

  acceptOrder(dialog: Md2Dialog){
    this.updatedOrder.status = "approved";
    this.updatedOrder.rejectReason = null;
    this.orderService.updateOrder(this.updatedOrder).subscribe(data => {
      if(data.success){
        this.flashMessageService.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
      } else {
        this.flashMessageService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    dialog.close();
  }

  openReject(dialog: Md2Dialog) {
    dialog.open();
  }

  rejectOrder(dialog: Md2Dialog, rejectReason: any){
    if (this.rejectReason !=null && this.rejectReason.length != null) {
      this.updatedOrder.status = "canceled";
      this.updatedOrder.rejectReason = rejectReason;
      this.orderService.updateOrder(this.updatedOrder).subscribe(data => {
        if(data.success){
          this.flashMessageService.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
        } else {
          this.flashMessageService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        }
      });
      dialog.close();
    }
  }

  cancel(dialog: any) {
    this.updatedOrder.status = null;
    this.updatedOrder.rejectReason = null;
    dialog.close();
  }

}

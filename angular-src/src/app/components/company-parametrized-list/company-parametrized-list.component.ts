import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {CompanyService} from "../../services/company.service";
import {ActivatedRoute} from '@angular/router';
import {Md2Dialog, Md2Module} from 'md2';
import {AuthService} from "../../services/auth.service";
import {OrderService} from "../../services/order.service";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-company-parametrized-list',
  templateUrl: './company-parametrized-list.component.html',
  styleUrls: ['./company-parametrized-list.component.css']
})
export class CompanyParametrizedListComponent implements OnInit {
  companies: any[] = [];
  cleaningRequest: any;
  selectedType: any;
  roomDescriptions: any;
  selectedCompany = {
    _id: null,
    username: null,
    approximatePrice: null
  };
  order: any;


  constructor(
    private companyService: CompanyService,
    private flashMessageService: FlashMessagesService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.cleaningRequest = params;
      this.selectedType = JSON.parse(this.cleaningRequest.selectedType);
      this.roomDescriptions = JSON.parse(this.cleaningRequest.roomDescriptions);
      this.companyService.getCompanyParametrizedList(params).subscribe(data => {
        if(data.success){
          this.companies = data.company;
          for (let i = 0; i < this.companies.length; i++) {
            this.commentService.getRaiting(this.companies[i]._id).subscribe((data => {
              if (data.success) {
                this.companies[i].comment = data.rating;
              }
            });
          }
        } else {
          this.flashMessageService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        }
      })
    });
  }

  openOrder(dialog: Md2Dialog, id: any) {
    for (let company of this.companies){
      if (company._id == id){
        this.selectedCompany = company;
      }
    }
    dialog.open();
  }

  cancel(dialog: any) {
    dialog.close();
  }

  confirmOrder(dialog: any) {
    this.order = {
      cleaningTypeId: this.selectedType._id,
      cleaningTypeName: this.selectedType.name,
      roomDescriptions: JSON.stringify(this.roomDescriptions),
      address: this.cleaningRequest.address,
      selectedDays: this.cleaningRequest.selectedDays,
      regularity: this.cleaningRequest.regularity,
      email: this.cleaningRequest.email,
      companyId: this.selectedCompany._id,
      companyName: this.selectedCompany.username,
      customerId: this.authService.getId(),
      price: this.selectedCompany.approximatePrice,
    };
    this.orderService.order(this.order).subscribe(data => {
      if(data.success){
        dialog.close();
      } else {
        this.flashMessageService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }
}


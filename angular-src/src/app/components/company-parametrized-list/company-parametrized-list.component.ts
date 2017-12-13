import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {CompanyService} from "../../services/company.service";
import {ActivatedRoute} from '@angular/router';
import {Md2Dialog, Md2Module} from 'md2';
import {AuthService} from "../../services/auth.service";
import {OrderService} from "../../services/order.service";

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
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.cleaningRequest = params;
      console.log(this.cleaningRequest);
      this.selectedType = JSON.parse(this.cleaningRequest.selectedType);
      this.roomDescriptions = JSON.parse(this.cleaningRequest.roomDescriptions);
      this.companyService.getCompanyParametrizedList(params).subscribe(data => {
        if(data.success){
          this.companies = data.company;
        } else {
          this.flashMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
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
      roomTypeId: this.roomDescriptions.typeId,
      roomCount: this.roomDescriptions.count,
      roomName: this.roomDescriptions.name,
      address: this.cleaningRequest.address,
      selectedDays: this.cleaningRequest.selectedDays,
      regularity: this.cleaningRequest.regularity,
      email: this.cleaningRequest.email,
      companyId: this.selectedCompany._id,
      companyName: this.selectedCompany.username,
      customerId: this.authService.getId(),
      price: this.selectedCompany.approximatePrice,
    };

    console.log(this.order);

    this.orderService.order(this.order).subscribe(data => {
      if(data.success){
        dialog.close();
      } else {
        this.flashMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { TimePickerModule } from "ng2-simple-timepicker";
import { CleaningTypeService} from "../../services/cleaning-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../../services/auth.service";
import {RoomTypeService} from "../../services/room-type.service";
import {CompanyService} from "../../services/company.service";
import {Md2Dialog} from "md2";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  cleaningTypes;
  roomTypes;
  email;
  selectedDays: any[] = [];
  cleaningRequest = {
    selectedDays: [],
    roomDescriptions: null,
    selectedType: null,
    companyId: null,
    dueDate: null,
    time: null
  };
  roomDescriptions: any[] = [];

  selectedType = {
    _id: null,
    name: null
  };

  order: any;
  selectedCompany = {
    _id: null,
    username: null,
    approximatePrice: null
  };


  constructor(
    private cleaningTypeService: CleaningTypeService,
    private roomTypeService: RoomTypeService,
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private companyService: CompanyService,
    private orderService: OrderService
  ) { }


  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.selectedCompany = params;
    });
    this.cleaningTypeService.getCleaningTypes().subscribe(data => {
      this.cleaningTypes = data.types;
    });
    this.roomTypeService.getRoomTypes().subscribe(data => {
      this.roomTypes = data.types;
      this.roomDescriptions = data.types;
    });
  }

  openOrder(dialog: Md2Dialog) {
    let company = {
      companyId: this.selectedCompany._id,
      selectedType: this.selectedType._id;
      roomDescriptions: JSON.stringify(this.roomDescriptions)
    }
    this.companyService.getPrice(company).subscribe(data => {
      this.order = {
        cleaningTypeId: this.selectedType._id,
        cleaningTypeName: this.addNameOfCleaningtype(),
        roomDescriptions: JSON.stringify(this.roomDescriptions),
        address: this.cleaningRequest.address,
        selectedDays: this.cleaningRequest.selectedDays,
        regularity: this.cleaningRequest.regularity,
        email: this.cleaningRequest.email,
        companyId: this.selectedCompany._id,
        companyName: this.selectedCompany.username,
        customerId: this.authService.getId(),
        price: data.price,
        dueDate: this.cleaningRequest.dueDate,
        time: this.cleaningRequest.time
      };
      dialog.open();
    });
  }

  cancel(dialog: any) {
    dialog.close();
  }

  confirmOrder(dialog: any) {
    this.orderService.order(this.order).subscribe(data => {
      if(data.success){
        dialog.close();
      } else {
        this.flashMessageService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  onViewOffersSubmit(){
    this.cleaningRequest.roomDescriptions = JSON.stringify(this.roomDescriptions);
    this.selectedType.name = this.addNameOfCleaningtype();
    this.cleaningRequest.selectedType = JSON.stringify(this.selectedType);
    this.router.navigate(['/companyParametrizedList'], {queryParams:  this.cleaningRequest});
  }


  addNameOfCleaningtype(){
    for (let cleaningType of this.cleaningTypes){
      if(this.selectedType._id == cleaningType._id){
        return cleaningType.name;
      }
    }
  }

  addDescription(id, count){
    for(let i=0; i< this.roomDescriptions.length; i++){
      if (this.roomDescriptions[i]._id != undefined && this.roomDescriptions[i]._id == id) {
        this.roomDescriptions[i].count = count;
      }
    }

  }

  addDay(name:string, isChecked: boolean) {
    if(isChecked) {
      this.selectedDays.push(name);
    } else {
      let index = this.selectedDays.indexOf(name);
      this.selectedDays.splice(index,1);
    }
    this.cleaningRequest.selectedDays = this.selectedDays;
  }

}

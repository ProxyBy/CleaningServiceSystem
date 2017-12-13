import { Component, OnInit } from '@angular/core';
import { TimePickerModule } from "ng2-simple-timepicker";
import { CleaningTypeService} from "../../services/cleaning-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../../services/auth.service";
import {RoomTypeService} from "../../services/room-type.service";

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
    selectedType: null
  };
  roomDescriptions: any[] = [];

  selectedType = {
    _id: null,
    name: null
  };


  constructor(
    private cleaningTypeService: CleaningTypeService,
    private roomTypeService: RoomTypeService,
    private authService: AuthService,
    private router: Router
  ) { }

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

  ngOnInit() {
    this.cleaningTypeService.getCleaningTypes().subscribe(data => {
      this.cleaningTypes = data.types;
    });
    this.roomTypeService.getRoomTypes().subscribe(data => {
      this.roomTypes = data.types;
      this.roomDescriptions = data.types;
    });
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

import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {CleaningTypeService} from "../../services/cleaning-type.service";
import {RoomTypeService} from "../../services/room-type.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {
  company = {
    _id: null,
    logo: null,
    username: null,
    description: null,
    email: null,
    cleaningTypes: null,
    oldPassword: null,
    roomPrices: null,
    password: null,
    confirmPassword: null
  };
  cleaningTypes;
  roomTypes: any[] = [];
  selectedTypes: any[] = [];
  roomPrices: any[] = [];
  companyId: any;


  constructor(
    private profileService: ProfileService,
    private flashMessageService: FlashMessagesService,
    private cleaningTypeService: CleaningTypeService,
    private roomTypeService: RoomTypeService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.companyId = params['companyId'];
      this.profileService.getProfile({_id: this.companyId}).subscribe(data => {
        this.company = data.user;
        this.selectedTypes = this.company.cleaningTypes;
        this.roomPrices = this.company.roomPrices;
      });
      this.cleaningTypeService.getCleaningTypes().subscribe(data => {
        this.cleaningTypes = data.types;
        console.log(this.cleaningTypes);
      });
      this.roomTypeService.getRoomTypes().subscribe(data => {
        this.roomTypes = data.types;
        console.log(this.roomTypes);
      })
    });
  }

  getCoefficient(typeId){
    for(let selectType of this.selectedTypes){
      if(selectType.typeId == typeId){
        return selectType.coefficient;
      }
    }
  }

  isChecked(typeId){
    for (let type of this.company.cleaningTypes){
      if(type.typeId == typeId){
        return true;
      }
    }
  }

  isInSelectedArray(typeId){
    for(let selectedType of this.selectedTypes){
      if (selectedType.typeId != undefined && selectedType.typeId == typeId) {
        return true;
      }
    }
    return false;
  }

  getRoomName(typeId){
    for (let roomType of this.roomTypes){
      if(roomType._id == typeId){
        return roomType.name
      }
    }
  }

  order(){

  }

  comment(){
    this.router.navigate(['/comment', this.companyId]);
  }
}

import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {ValidateService} from "../../services/validate.service";
import {ProfileService} from "../../services/profile.service";
import {AuthService} from "../../services/auth.service";
import {CleaningTypeService} from "../../services/cleaning-type.service";
import {RoomTypeService} from "../../services/room-type.service";

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
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
  cleaningTypeObject: {typeId: number, coefficient:number };

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private cleaningTypeService: CleaningTypeService,
    private roomTypeService: RoomTypeService

  ) { }

  ngOnInit() {
    this.profileService.getProfile({_id: this.authService.getId()}).subscribe(data => {
      this.company = data.user;
      this.selectedTypes = this.company.cleaningTypes;
      this.roomPrices = this.company.roomPrices;
    });
    this.cleaningTypeService.getCleaningTypes().subscribe(data => {
      this.cleaningTypes = data.types;
    });
    this.roomTypeService.getRoomTypes().subscribe(data => {
      this.roomTypes = data.types;
    })
  }

  getRoomName(typeId){
    for (let roomType of this.roomTypes){
      if(roomType._id == typeId){
        return roomType.name
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

  addRoomPrice(id, price) {
    for (let i=0; i< this.roomPrices.length; i++) {
      if (this.roomPrices[i].typeId == id) {
        this.roomPrices[i].price = price;
        return;
      }
    }
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

  addType(id:number, isChecked: boolean) {
    let i = 0;
    if(isChecked) {
      this.cleaningTypeObject = {
        typeId: id,
        coefficient: null
      }
      this.selectedTypes.push(this.cleaningTypeObject);
    } else {
      for(i=0; i< this.selectedTypes.length; i++){
        if(this.selectedTypes[i].typeId == id){
          break;
        }
      }
      this.selectedTypes.splice(i,1);
    }
  }

  addCoefficient(id, coefficient){
    for(let i=0; i< this.selectedTypes.length; i++){
      if (this.selectedTypes[i].typeId != undefined && this.selectedTypes[i].typeId == id) {
        this.selectedTypes[i].coefficient = coefficient
      }
    }
  }

  goBack() {
    window.history.back();
  }

  save() {

    this.company.roomPrices = this.roomPrices;
    this.company.cleaningTypes = this.selectedTypes;

    console.log(this.company)

    if(!this.validateService.validateProfileCompany(this.company)){
      this.flashMessageService.show('Please fill all required fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateEmail(this.company.email)){
      this.flashMessageService.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validatePassword(this.company)){
      this.flashMessageService.show('Password and confirm password do not match', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Update company
    this.profileService.updateCompanyProfile(this.company).subscribe(data => {
      if(data.success){
        this.flashMessageService.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

}


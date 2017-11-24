import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {ValidateService} from "../../services/validate.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
import {CleaningTypeService} from "../../services/cleaning-type.service";
import {noUndefined} from "@angular/compiler/src/util";
import {RoomTypeService} from "../../services/room-type.service";


@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {
  /*  public logo: FileUploader = new FileUploader({url:'http://localhost:3001/upload'});*/
  logo: String;
  name: String;
  description: String;
  email: String;
  serviceTypes: any[] = [];
  password: String;
  confirmPassword;
  cleaningTypes;
  selectedTypes: any[] = [];
  cleaningTypeObject: {typeId: number, coefficient:number };
  roomTypes: any[] = [];
  roomPrice: {typeId: number, price:number };
  roomPrices: any[] = [];


  constructor(
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private cleaningTypeService: CleaningTypeService,
    private roomTypeService: RoomTypeService
  ) { }

  ngOnInit() {
    this.cleaningTypeService.getCleaningTypes().subscribe(data => {
      this.cleaningTypes = data.types;
    });
    this.roomTypeService.getRoomTypes().subscribe(data => {
      this.roomTypes = data.types;
    })
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

  isInSelectedArray(typeId){
    for(let selectedType of this.selectedTypes){
      if (selectedType.typeId != undefined && selectedType.typeId == typeId) {
        return true;
      }
    }
    return false;
  }

  addRoomPrice(id, price) {
    for (let i=0; i < this.roomPrices.length; i++) {
      if (this.roomPrices[i].typeId == id) {
        this.roomPrices[i].price = price;
        return;
      }
    }
    this.roomPrice = {
      typeId: id,
      price: price
    }
    this.roomPrices.push(this.roomPrice);
  }

  onRegisterSubmit(){
    const company = {
      logo: this.logo,
      name: this.name,
      description: this.description,
      email: this.email,
      cleaningTypes: this.selectedTypes,
      roomPrices: this.roomPrices,
      password: this.password,
      confirmPassword: this.confirmPassword,
      role: "company"
    };

    if(!this.validateService.validateRegisterCompany(company)){
      this.flashMessageService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateEmail(company.email)){
      this.flashMessageService.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validatePassword(company)){
      this.flashMessageService.show('Password and confirm password do not match', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Register company
    this.authService.registerCompany(company).subscribe(data => {
      if(data.success){
        this.flashMessageService.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/companyRegister'])
      }
    })

  }
}


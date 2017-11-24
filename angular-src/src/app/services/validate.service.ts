import { Injectable } from '@angular/core';
import {validate} from "codelyzer/walkerFactory/walkerFn";

@Injectable()
export class ValidateService {

  constructor() { }

  validateRequiredRegister(user) {
    if (user.username == undefined
      || user.password == undefined
      || user.confirmPassword == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateRegister(user) {
    if (user.email == undefined
      && user.phone == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateRegisterCompany(company) {
    if (company.logo == undefined
      || company.name == undefined
      || company.description == undefined
      || company.cleaningTypes == undefined
      || company.cleaningTypes.length == 0
      || company.password == undefined
      || company.confirmPassword == undefined
      || company.email == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateProfileCompany(company) {
    if (company.logo == undefined
      || company.username == undefined
      || company.description == undefined
      || company.cleaningTypes == undefined
      || company.cleaningTypes.length == 0
      || company.oldPassword == undefined
      || company.email == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validatePassword(user){
    if (user.password != user.confirmPassword){
      return false;
    } else {
      return true;
    }
  }

  validatePhone(phone){
    const re = /\d{3}-\d{3}-\d{4}/;
    if(!re.test(phone) && phone != undefined){
      return false
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email) && email != undefined){
      return false
    } else {
      return true;
    }
  }
}

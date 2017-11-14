import { Injectable } from '@angular/core';
import {validate} from "codelyzer/walkerFactory/walkerFn";

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.name == undefined
      || user.username == undefined
      || user.password == undefined
      || user.email == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateRegisterCompany(company) {
    if (company.logo == undefined
      || company.name == undefined
      || company.description == undefined
      || company.serviceTypes == undefined
      || company.serviceTypes.length == 0
      || company.password == undefined
      || company.email == undefined) {
      return false;
    } else {
      return true;
    }
  }


  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}

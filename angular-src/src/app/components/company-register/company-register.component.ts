import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {ValidateService} from "../../services/validate.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
import {CleaningTypeService} from "../../services/cleaning-type.service";


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

  cleaningTypes;
  selectedTypes: any[] = [];

  constructor(
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private cleaningTypeService: CleaningTypeService
  ) { }

  ngOnInit() {
    this.cleaningTypeService.getCleaningTypes().subscribe(data => {
      this.cleaningTypes = data.types;
    })
  }


  addType(id:number, isChecked: boolean) {
    if(isChecked) {
      this.selectedTypes.push(id);
    } else {
      let index = this.selectedTypes.indexOf(id);
      this.selectedTypes.splice(index,1);
    }
  }

  onRegisterSubmit(){
    const company = {
      logo: this.logo,
      name: this.name,
      description: this.description,
      email: this.email,
      cleaningTypes: this.selectedTypes,
      password: this.password
    };

    if(!this.validateService.validateRegisterCompany(company)){
      this.flashMessageService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateEmail(company.email)){
      this.flashMessageService.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
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


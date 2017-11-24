import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService} from "../../services/auth.service";
import { Router } from "@angular/router";
import {noUndefined} from "@angular/compiler/src/util";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: String;
  email: String;
  phone: String;
  password: String;
  confirmPassword: String;

  constructor(
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      username: this.username,
      email: this.email,
      phone: this.phone,
      password: this.password,
      confirmPassword: this.confirmPassword,
      role: "customer"
    };

    if(!this.validateService.validateRequiredRegister(user)){
      this.flashMessageService.show('Please fill all required fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateRegister(user)){
      this.flashMessageService.show('Please fill phone number or email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessageService.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validatePassword(user)){
      this.flashMessageService.show('Password and confirm password do not match', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validatePhone(user.phone)){
      this.flashMessageService.show('Please use a valid phone number', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessageService.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register'])
      }
    })

  }

}

import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService} from "../../services/auth.service";
import { Router } from "@angular/router";
import {noUndefined} from "@angular/compiler/src/util";
import {ProfileService} from "../../services/profile.service";

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
  user: any;
  isDisabled: boolean;
  atempt = 5;

  constructor(
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.isDisabled = false;
  }

  ngOnInit() {
  }

  onRegisterSubmit(){
    this.user = {
      username: this.username,
      email: this.email,
      phone: this.phone,
      password: this.password,
      confirmPassword: this.confirmPassword,
      role: "customer"
    };

    if(!this.validateService.validateRequiredRegister(this.user)){
      this.flashMessageService.show('Please fill all required fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateRegister(this.user)){
      this.flashMessageService.show('Please fill phone number or email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateEmail(this.user.email)){
      this.flashMessageService.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validatePassword(this.user)){
      this.flashMessageService.show('Password and confirm password do not match', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validatePhone(this.user.phone)){
      this.flashMessageService.show('Please use a valid phone number', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Register user
    this.authService.registerUser(this.user).subscribe(data => {
      if(data.success){
        this.flashMessageService.show('You are now registered. We send activation cod by email. Please activate your accaunt.', {cssClass: 'alert-success'});
        this.isDisabled = true;
        this.user._id = data._id;
      } else {
        this.flashMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    })
  }

  activateSubmit(){
    if (this.user.temproraryToken != null && this.user._id != null){
      this.atempt--;
      this.profileService.activateProfile(this.user).subscribe(data => {
        if(data.success && this.atempt > 0){
          if(data.active){
            if(this.user.email !=null){
              this.user.identifier = this.user.email;
            } else {
              this.user.identifier = this.user.phone;
            }
            this.authService.authenticateUser(this.user).subscribe(data => {
              if(data.success){
                this.authService.storeUserData(data.token, data.user);
                window.history.back();
              } else {
                this.flashMessageService.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
              }
            });
          } else {
            this.flashMessageService.show('Your activation cod not correct. Try again. You have ' + this.atempt + ' atempt(s)' , {cssClass: 'alert-danger', timeout: 3000});
          }
        } else {
          this.flashMessageService.show('Something went wrong. You should register again', {cssClass: 'alert-danger', timeout: 3000});
          this.profileService.deleteProfile(this.user).subscribe(data => {
            if(data.success){
              location.reload();
            } else {
              this.flashMessageService.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
            }
          });
        }
      })
    }
  }
}

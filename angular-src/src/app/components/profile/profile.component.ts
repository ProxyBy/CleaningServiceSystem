import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import {ProfileService} from "../../services/profile.service";
import {ValidateService} from "../../services/validate.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    _id: null,
    username: null,
    email: null,
    phone: null,
    oldPassword: null,
    password: null,
    confirmPassword: null
  };

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService
  ) { }

  ngOnInit(){
    this.profileService.getProfile({_id: this.authService.getId()}).subscribe(data => {
      this.user = data.user;
    });
  }

  goBack() {
    window.history.back();
  }

  save() {
    console.log(this.user)
    if(this.user.username == undefined || this.user.oldPassword == undefined){
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

    //Update user
    this.profileService.updateUserProfile(this.user).subscribe(data => {
      if(data.success){
        this.flashMessageService.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessageService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }
}

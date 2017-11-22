import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";
import {ValidateService} from "../../services/validate.service";
import {identifierName} from "@angular/compiler";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  identifier: String;
  password: String;

  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private validateService: ValidateService
    ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    if(this.validateService.validateEmail(this.identifier)){
      const user = {
        email: this.identifier,
        password: this.password
      }
    }
    if(this.validateService.validatePhone(this.identifier)){
      const user = {
        phone: this.identifier,
        password: this.password
      }
    }
    if(!this.validateService.validateEmail(this.identifier) && !this.validateService.validatePhone(this.identifier)){
      this.flashMessagesService.show('Please fill valid phone number or email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessagesService.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
        if (data.user.role == "admin"){
          this.router.navigate(['/users']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      } else {
        this.flashMessagesService.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['/login']);
      }
    });
  }

}

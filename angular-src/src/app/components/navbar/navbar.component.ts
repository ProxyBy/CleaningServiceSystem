import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private adminPages = [
    "users"
  ];

  private userPages = [
    "company"
  ];

  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.role = this.authService.user.role;

     console.log(this.authService.getUser());
    //authService.user.role
  }

  onLogoutClick(){
    this.authService.logout();

    this.flashMessagesService.show('You are logout', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }

  isAvailablePage(page){
    let role = this.authService.getRole();
    let i = this.adminPages.indexOf(page);
    if(role == "admin" && this.adminPages.indexOf(page)!= -1){
      return true;
    }
    if(role == "user" && this.userPages.indexOf(page)!= -1){
      return true;
    }
    return false;
  }
}

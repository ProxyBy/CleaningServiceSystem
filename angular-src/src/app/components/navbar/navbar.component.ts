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
    "users",
    "companyList"
  ];

  private userPages = [
    "company",
    "profile",
    "serviceHistory",
    "companyAvailableList"
  ];

  private companyPages = [
    "companyProfile"
  ];

  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessagesService.show('You are logout', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }

  isAvailablePage(page){
    let role = this.authService.getRole();
    if(role == "admin" && this.adminPages.indexOf(page)!= -1){
      return true;
    }
    if(role == "customer" && this.userPages.indexOf(page)!= -1){
      return true;
    }
    if(role == "company" && this.companyPages.indexOf(page)!= -1){
      return true;
    }
    return false;
  }
}

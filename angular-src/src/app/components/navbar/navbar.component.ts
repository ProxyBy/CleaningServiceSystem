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


  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.role = this.authService.user.role;

     console.log(this.authService.user);
    //authService.user.role
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessagesService.show('You are logout', {cssclass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }

}

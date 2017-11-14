import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users;

  constructor(
    private userService: UserService,
    private flashMessageService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      if(data.success){
        this.users = data.users;
      } else {
        this.flashMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

}

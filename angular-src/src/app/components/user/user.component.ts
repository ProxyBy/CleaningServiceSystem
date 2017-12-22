import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Md2Dialog, Md2Module} from 'md2';
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users;
  currentId;
  currentBanReason;

  constructor(
    private userService: UserService,
    private flashMessageService: FlashMessagesService,
    private profileService: ProfileService
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

  confirmLock(dialog: any, id: any) {
    if (this.currentBanReason !=null && this.currentBanReason.length != null) {
      this.moderation();
      this.currentId = null;
      this.currentBanReason = null;
      dialog.close();
    }
  }

  confirmUnlock(dialog: any, id: any) {
    this.moderation();
    this.currentId = null;
    this.currentBanReason = null;
    dialog.close();
  }

  openUnlock(dialog: Md2Dialog, id: any) {
    this.currentId = id;
    dialog.open();
  }

  openLock(dialog: Md2Dialog, id: any, banReason: any) {
    this.currentId = id;
    this.currentBanReason = banReason;
    dialog.open();
  }

  cancel(dialog: any) {
    this.currentId = null;
    this.currentBanReason = null;
    dialog.close();
  }

  moderation(){
    for (let user of this.users){
      if(user._id == this.currentId){
        user.status = user.status == "active" ? "inactive" : "active";
        user.banReason = this.currentBanReason;
        this.profileService.profileModeration(user).subscribe(data => {
          if(data.success){
            this.flashMessageService.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
          } else {
            this.flashMessageService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
          }
        })
      }
    }
  }
}

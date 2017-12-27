import {Component, OnInit, ViewChild} from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {Md2Dialog, Md2Module} from 'md2';
import {CompanyService} from "../../services/company.service";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies;
  currentId;
  currentBanReason;

  constructor(
    private companyService: CompanyService,
    private flashMessageService: FlashMessagesService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.companyService.getCompanyList().subscribe(data => {
      if(data.success){
        this.companies = data.company;
      } else {
        this.flashMessageService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
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
    for (let company of this.companies){
      if(company._id == this.currentId){
        company.status = company.status == "active" ? "inactive" : "active";
        company.banReason = this.currentBanReason;
        this.profileService.profileModeration(company).subscribe(data => {
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












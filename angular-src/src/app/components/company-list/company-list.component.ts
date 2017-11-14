import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {CompanyService} from "../../services/company.service";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies;

  constructor(
    private companyService: CompanyService,
    private flashMessageService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.companyService.getCompanyList().subscribe(data => {
      if(data.success){
        this.companies = data.company;
      } else {
        this.flashMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }
}









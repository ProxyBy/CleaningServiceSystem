import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {CompanyService} from "../../services/company.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-company-available-list',
  templateUrl: './company-available-list.component.html',
  styleUrls: ['./company-available-list.component.css']
})
export class CompanyAvailableListComponent implements OnInit {
  companies: any[]= [];

  constructor(
    private companyService: CompanyService,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.companyService.getAvailableCompanyList().subscribe(data => {
      if(data.success){
        this.companies = data.company;
      } else {
        this.flashMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  order(companyId){
    console.log(companyId);
    this.router.navigate(['/companyInfo', companyId]);
  }

}

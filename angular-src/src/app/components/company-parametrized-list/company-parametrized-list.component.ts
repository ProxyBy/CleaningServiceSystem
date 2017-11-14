import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {CompanyService} from "../../services/company.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-company-parametrized-list',
  templateUrl: './company-parametrized-list.component.html',
  styleUrls: ['./company-parametrized-list.component.css']
})
export class CompanyParametrizedListComponent implements OnInit {
  companies;

  constructor(
    private companyService: CompanyService,
    private flashMessageService: FlashMessagesService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.companyService.getCompanyParametrizedList(params).subscribe(data => {
        if(data.success){
          this.companies = data.company;
        } else {
          this.flashMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        }
      })
    });
  }
}



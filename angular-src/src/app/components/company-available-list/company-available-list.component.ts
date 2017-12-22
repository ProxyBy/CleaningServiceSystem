import {Component, OnInit} from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {CompanyService} from "../../services/company.service";
import {Router} from "@angular/router";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-company-available-list',
  templateUrl: './company-available-list.component.html',
  styleUrls: ['./company-available-list.component.css']
})
export class CompanyAvailableListComponent implements OnInit {
  companies: any[] = [];

  constructor(private companyService: CompanyService,
              private flashMessageService: FlashMessagesService,
              private router: Router,
              private commentService: CommentService) {
  }

  ngOnInit() {
    this.companyService.getAvailableCompanyList().subscribe(data => {
      if (data.success) {
        this.companies = data.company;
        for (let i = 0; i < this.companies.length; i++) {
          this.commentService.getRaiting(this.companies[i]._id).subscribe((data => {
            if (data.success) {
              this.companies[i].comment = data.rating;
            }
          });
        }
      } else {
        this.flashMessageService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  order(companyId) {
    this.router.navigate(['/companyInfo', companyId]);
  }

}

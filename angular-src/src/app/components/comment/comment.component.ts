import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentService} from "../../services/comment.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comment = {
    rating: null,
    text: null,
    authorId: null,
    companyId: null
  };

  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private commentService: CommentService,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.comment.companyId = params['companyId'];
    });
  }

  onSubmit(){
    this.comment.authorId = this.authService.getId();
    this.commentService.addComment(this.comment).subscribe(data => {
      if(data.success){
        this.flashMessageService.show('Your comment was added', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
      this.router.navigate(['/companyInfo', this.comment.companyId]);
    })
  }

}

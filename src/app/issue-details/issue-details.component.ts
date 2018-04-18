import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IssueService } from '../issue.service';


@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {

  issue: any;
  comments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private issueService: IssueService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.issueService.getIssue(id)
      .subscribe(issue => {
        this.issue = issue;
        this.issueService.getComments(issue.comments_url)
          .subscribe(comments => this.comments = comments);
      });
  }

  goBack(): void {
    this.location.back();
  }
}

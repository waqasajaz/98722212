import { Component, OnInit } from '@angular/core';

import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  issues: any[] = [];

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.getIssues();
  }

  getIssues(): void {
    this.issueService.getIssues()
    .subscribe(issues => this.issues = issues);
  }

  getColor(color) {
    console.log(color);
    const textColor = color === '000000' ? 'white' : 'black';
    return {
      'background-color': '#' + color,
      'color': textColor
    };
  }

}

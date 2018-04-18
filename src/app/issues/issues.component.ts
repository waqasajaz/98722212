import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';

import { IssueService } from '../issue.service';


@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  issues: any[] = [];
  issuesBackup: any[] = [];
  filter: String = '';
  sortBy: String = 'newest';
  @ViewChild('searchBox') searchBox: ElementRef;

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.getIssues();
  }

  getIssues(): void {
    this.issueService.getIssues()
    .subscribe(issues => {
      this.issuesBackup = issues;
      this.issues = issues;
    });
  }

  setFilter(filterName) {
    this.filter = _.capitalize(filterName);
    this.searchBox.nativeElement.value = '';
    this.issues = this.issuesBackup;
  }

  applySort(sortStr) {
    this.sortBy = sortStr;
    if (['newest', 'oldest'].indexOf(sortStr) !== -1) {
      this.issues.sort((issue1, issue2) => {
        let returnVal = 0;
        const date1 = new Date(issue1.created_at).getTime();
        const date2 = new Date(issue2.created_at).getTime();
        if (date1 < date2) {
          returnVal = -1;
        } else if (date1 > date2) {
          returnVal = 1;
        } else {
          return 0;
        }
        return sortStr === 'newest' ? (returnVal - (returnVal * 2)) : returnVal;
      });
    } else if (sortStr === 'most-com') {
      this.issues = _.sortBy(this.issues, [o => o.comments]).reverse();
    } else if (sortStr === 'least-com') {
      this.issues = _.sortBy(this.issues, [o => o.comments]);
    }
  }

  applyFilter(searchStr) {
    if (!this.filter) {
      return;
    }
    if (!searchStr) {
      this.issues = this.issuesBackup;
      return;
    }
    searchStr = searchStr.toLowerCase();
    let filteredIssues = [];
    if (this.filter === 'Title') {
      filteredIssues = this.issues.filter(issue => issue.title.indexOf(searchStr) !== -1);
    } else if (this.filter === 'User') {
      filteredIssues = this.issues.filter(issue => issue.user.login.indexOf(searchStr) !== -1);
    } else if (this.filter === 'State') {
      filteredIssues = this.issues.filter(issue => issue.state.indexOf(searchStr) !== -1);
    }
    this.issues = filteredIssues;
  }

  getColor(color) {
    const textColor = color === '000000' ? 'white' : 'black';
    return {
      'background-color': '#' + color,
      'color': textColor
    };
  }

}

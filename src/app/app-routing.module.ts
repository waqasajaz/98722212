import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IssuesComponent } from './issues/issues.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/issues', pathMatch: 'full' },
  { path: 'issues', component: IssuesComponent },
  { path: 'issues/:id', component: IssueDetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

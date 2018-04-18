import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { IssuesComponent } from './issues/issues.component';
import { AppRoutingModule } from './/app-routing.module';
import { IssueDetailsComponent } from './issue-details/issue-details.component';

import { IssueService } from './issue.service';



@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent,
    IssueDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgbModule.forRoot()
  ],
  providers: [ IssueService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

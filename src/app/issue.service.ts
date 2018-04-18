import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


@Injectable()
export class IssueService {

  private issuesUrl = 'https://api.github.com/repos/angular/angular.js/issues';
  private issues: any[] = [];
  constructor(
    private http: HttpClient
  ) { }

  getIssues(): Observable<any[]> {
    return this.http.get<any[]>(this.issuesUrl)
      .pipe(
        tap(issues => {
          this.log(`issues fetched`);
          // store issues in cache
          this.issues = issues;
        }),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getComments(commentsURL): Observable<any[]> {
    return this.http.get<any[]>(commentsURL)
      .pipe(
        tap(issues => this.log(`comments fetched`)),
        catchError(this.handleError('getComments', []))
      );
  }

  getIssue(id: number): Observable<any> {
    let result = this.issues.filter(issue => issue.id === id);
    result = (result && result.length) ? result[0] : null;
    return of(result);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a Issue Service messages */
  private log(message: string) {
    console.log(message);
  }
}

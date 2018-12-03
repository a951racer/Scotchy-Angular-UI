// import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { apiConfig } from '../api.config';

@Injectable()
export class AuthenticationService {
  public user = window['user'];
  public message;

  private _signinURL = apiConfig.signinURL;
  private _signupURL = apiConfig.signupURL;
  private _signoutURL = apiConfig.signoutURL;

  constructor (private http: HttpClient) {
  }

  isLoggedIn(): boolean {
    return (!!this.user);
  }

  signin(credentials: any): Observable<any> {
    const body = JSON.stringify(credentials);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                               'Access-Control-Allow-Origin': '*',
                               'Access-Control-Allow-Heades': 'Origin, X-Requested-With, Content-Type, Accept'});
    const options = { 'headers': headers };
    return this.http.post(this._signinURL, body, options)
      // .map(res => this.user = res.json())
      .pipe(
        catchError(this.handleError));
  }

  signup(user: any): Observable<any> {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.post(this._signupURL, body, options)
      .pipe(catchError(this.handleError));
  }

  signout(): Observable<any> {
    // const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    this.user = null;
    return this.http.get(this._signoutURL, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.error.message);
    return throwError(error.error.message || 'Server error');
  }
}

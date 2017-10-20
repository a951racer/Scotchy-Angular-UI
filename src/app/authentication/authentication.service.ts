import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { apiConfig } from '../api.config';

@Injectable()
export class AuthenticationService {
  public user = window['user'];
  public message;

  private _signinURL = apiConfig.signinURL;
  private _signupURL = apiConfig.signupURL;
  private _signoutURL = apiConfig.signoutURL;

  constructor (private http: Http) {
  }

  isLoggedIn(): boolean {
    return (!!this.user);
  }

  signin(credentials: any): Observable<any> {
    const body = JSON.stringify(credentials);
    const headers = new Headers({ 'Content-Type': 'application/json',
                               'Access-Control-Allow-Origin': '*',
                               'Access-Control-Allow-Heades': 'Origin, X-Requested-With, Content-Type, Accept'});
    const options = new RequestOptions({ 'headers': headers });
    return this.http.post(this._signinURL, body, options)
      .map(res => this.user = res.json())
      .catch(this.handleError);
  }

  signup(user: any): Observable<any> {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this._signupURL, body, options)
      .map(res => this.user = res.json())
      .catch(this.handleError);
  }

  signout(): Observable<any> {
    // const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    this.user = null;
    return this.http.get(this._signoutURL, options)
      .map(res => this.message = res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().message || 'Server error');
  }
}

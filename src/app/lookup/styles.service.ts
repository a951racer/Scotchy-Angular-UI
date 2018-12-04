// import 'rxjs/Rx';

import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { apiConfig } from '../api.config';

@Injectable()
export class StylesService {
  private _baseURL = apiConfig.stylesURL;
  constructor (private _http: HttpClient) {}

/*** Style stuff ********************************/

  create(style: any): Observable<any> {
    return this._http
      .post(this._baseURL, style)
      .pipe(catchError(this.handleError));
    }

  read(styleId: string): Observable<any> {
    return this._http
      .get(`${this._baseURL}/${styleId}`)
      .pipe(catchError(this.handleError));
  }

  update(style: any): Observable<any> {
    return this._http
      .put(`${this._baseURL}/${style._id}`, style)
      .pipe(catchError(this.handleError));
    }

  delete(styleId: any): Observable<any> {
    return this._http
      .delete(`${this._baseURL}/${styleId}`)
      .pipe(catchError(this.handleError));
  }

  list(): Observable<any> {
    return this._http
      .get(this._baseURL)
      .pipe(catchError(this.handleError));
  }

  getStyleId(style: string): Observable<any> {
    return this._http
      .get(`${this._baseURL}/byName/${style}`)
      .pipe(catchError(this.handleError));
  }

/***  Error Handling **************************************/

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error.message || 'Server error');
  }
}

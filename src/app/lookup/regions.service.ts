// import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { apiConfig } from '../api.config';

@Injectable()
export class RegionsService {
  private _baseURL = apiConfig.regionsURL;
  constructor (private _http: HttpClient) {}

/*** Regions stuff ********************************/

  create(region: any): Observable<any> {
    return this._http
      .post(this._baseURL, region)
      .pipe(catchError(this.handleError));
    }

  read(regionId: string): Observable<any> {
    return this._http
      .get(`${this._baseURL}/${regionId}`)
      .pipe(catchError(this.handleError));
  }

  update(region: any): Observable<any> {
    return this._http
      .put(`${this._baseURL}/${region._id}`, region)
      .pipe(catchError(this.handleError));
    }

  delete(regionId: any): Observable<any> {
    return this._http
      .delete(`${this._baseURL}/${regionId}`)
      .pipe(catchError(this.handleError));
  }

  list(): Observable<any> {
    return this._http
      .get(this._baseURL)
      .pipe(catchError(this.handleError));
  }

  getRegionsId(region: string): Observable<any> {
    return this._http
      .get(`${this._baseURL}/byName/${region}`)
      .pipe(catchError(this.handleError));
  }

/***  Error Handling **************************************/

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error.message || 'Server error');
  }
}

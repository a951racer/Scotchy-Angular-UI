// import 'rxjs/Rx';

import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { apiConfig } from '../api.config';

@Injectable()
export class SettingsService {
  private _baseURL = apiConfig.scotchesURL;
  constructor (private _http: HttpClient) {}

/*** Scotch stuff ********************************/

  create(scotch: any): Observable<any> {
    return this._http
      .post(this._baseURL, scotch)
      .pipe(catchError(this.handleError));
    }

  read(scotchId: string): Observable<any> {
    return this._http
      .get(`${this._baseURL}/${scotchId}`)
      .pipe(catchError(this.handleError));
  }

  update(scotch: any): Observable<any> {
    return this._http
      .put(`${this._baseURL}/${scotch._id}`, scotch)
      .pipe(catchError(this.handleError));
    }

  delete(scotchId: any): Observable<any> {
    return this._http
      .delete(`${this._baseURL}/${scotchId}`)
      .pipe(catchError(this.handleError));
  }

  list(): Observable<any> {
    return this._http
      .get(this._baseURL)
      .pipe(catchError(this.handleError));
  }

/*** Note stuff  ******************************/

  addNote(scotchId: string, note: any): Observable<any> {
    return this._http
      .post(`${this._baseURL}/notes/${scotchId}`, note)
      .pipe(catchError(this.handleError));
    }

  updateNote(scotchId: string, note: any): Observable<any> {
    return this._http
      .put(`${this._baseURL}/notes/${scotchId}`, note)
      .pipe(catchError(this.handleError));
    }

  deleteNote(scotchId: string, note: any): Observable<any> {
    return this._http
      .delete(`${this._baseURL}/notes/${scotchId}`, note)
      .pipe(catchError(this.handleError));
    }

/*** Tasting Stuff *********************************************/

  addTasting(scotchId: string, tasting: any): Observable<any> {
    console.log('addTasting: ' + scotchId);
    return this._http
      .post(`${this._baseURL}/tastings/${scotchId}`, tasting)
      .pipe(catchError(this.handleError));
    }

  updateTasting(scotchId: string, tasting: any): Observable<any> {
    return this._http
      .put(`${this._baseURL}/tastings/${scotchId}`, tasting)
      .pipe(catchError(this.handleError));
    }

  deleteTasting(scotchId: string, tasting: any): Observable<any> {
    return this._http
      .delete(`${this._baseURL}/tastings/${scotchId}`, tasting)
      .pipe(catchError(this.handleError));
    }

/*** Wishlist stuff **************************************/

  addWishlist(scotchId: string, wishlist: any): Observable<any> {
    return this._http
      .post(`${this._baseURL}/wishlists/${scotchId}`, wishlist)
      .pipe(catchError(this.handleError));
    }

  deleteWishlist(scotchId: string, wishlist: any): Observable<any> {
    return this._http
      .delete(`${this._baseURL}/wishlists/${scotchId}`, wishlist)
      .pipe(catchError(this.handleError));
    }


/***  Error Handling **************************************/

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error.message || 'Server error');
  }
}

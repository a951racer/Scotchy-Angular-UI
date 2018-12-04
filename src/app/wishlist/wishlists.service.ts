// import 'rxjs/Rx';

import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { apiConfig } from '../api.config';

@Injectable()
export class WishlistsService {
  private _baseURL = apiConfig.wishlistsURL;
  constructor (private _http: HttpClient) {}

/*** Wishlist stuff ********************************/

  create(wishlist: any): Observable<any> {
    return this._http
      .post(this._baseURL, wishlist)
      .pipe(catchError(this.handleError));
    }

  read(wishlistId: string): Observable<any> {
    return this._http
      .get(`${this._baseURL}/${wishlistId}`)
      .pipe(catchError(this.handleError));
  }

  update(wishlist: any): Observable<any> {
    return this._http
      .put(`${this._baseURL}/${wishlist._id}`, wishlist)
      .pipe(catchError(this.handleError));
    }

  delete(wishlistId: any): Observable<any> {
    return this._http
      .delete(`${this._baseURL}/${wishlistId}`)
      .pipe(catchError(this.handleError));
  }

  list(): Observable<any> {
    return this._http
      .get(this._baseURL)
      .pipe(catchError(this.handleError));
  }

  getWishlistId(wishlist: string): Observable<any> {
    return this._http
      .get(`${this._baseURL}/byName/${wishlist}`)
      .pipe(catchError(this.handleError));
  }

/*** TBD Scotch stuff  ******************************/

  /*** Add scotch to the wish list - really adding wishlist to the scotch document **/

  addScotch(wishlistId: string, scotch: any): Observable<any> {
    return this._http
      .post(`${this._baseURL}/wishlists/${wishlistId}`, scotch)
      .pipe(catchError(this.handleError));
    }

  /*** Pending removal ********
  updateNote(scotchId: string, note: any): Observable<any> {
    return this._http
      .put(`${this._baseURL}/notes/${scotchId}`, note)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }
*/

  deleteScotch(wishlistId: string, scotch: any): Observable<any> {
    return this._http
      .delete(`${this._baseURL}/wishlists/${wishlistId}`, scotch)
      .pipe(catchError(this.handleError));
    }


/***  Error Handling **************************************/

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error.message || 'Server error');
  }
}

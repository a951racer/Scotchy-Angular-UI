// import 'rxjs/Rx';

import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { apiConfig } from '../api.config';

@Injectable()
export class PricesService {
  private _baseURL = apiConfig.pricesURL;
  constructor (private _http: HttpClient) {}

/*** Price stuff ********************************/

  /* handled in scotches module
  create(wishlist: any): Observable<any> {
    return this._http
      .post(this._baseURL, wishlist)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

  read(wishlistId: string): Observable<any> {
    return this._http
      .get(`${this._baseURL}/${wishlistId}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  update(wishlist: any): Observable<any> {
    return this._http
      .put(`${this._baseURL}/${wishlist._id}`, wishlist)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

  delete(wishlistId: any): Observable<any> {
    return this._http
      .delete(`${this._baseURL}/${wishlistId}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
*/
  list(): Observable<any> {
    return this._http
      .get(this._baseURL)
      .pipe(catchError(this.handleError));
  }

  /*
  getWishlistId(wishlist: string): Observable<any> {
    return this._http
      .get(`${this._baseURL}/byName/${wishlist}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
*/
/***  Error Handling **************************************/

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error.message || 'Server error');
  }
}

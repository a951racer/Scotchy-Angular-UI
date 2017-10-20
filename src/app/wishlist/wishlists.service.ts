import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';
import {Http, Headers, Request, RequestMethod, Response} from '@angular/http';
import { apiConfig } from '../api.config';

@Injectable()
export class WishlistsService {
  private _baseURL = apiConfig.wishlistsURL;
  constructor (private _http: Http) {}

/*** Wishlist stuff ********************************/

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

  list(): Observable<any> {
    return this._http
      .get(this._baseURL)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getWishlistId(wishlist: string): Observable<any> {
    return this._http
      .get(`${this._baseURL}/byName/${wishlist}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

/*** TBD Scotch stuff  ******************************/

  /*** Add scotch to the wish list - really adding wishlist to the scotch document **/

  addScotch(wishlistId: string, scotch: any): Observable<any> {
    return this._http
      .post(`${this._baseURL}/wishlists/${wishlistId}`, scotch)
      .map((res: Response) => res.json())
      .catch(this.handleError);
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
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }


/***  Error Handling **************************************/

  private handleError(error: Response) {
    return Observable.throw(error.json().message || 'Server error');
  }
}

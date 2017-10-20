import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';
import {Http, Headers, Request, RequestMethod, Response} from '@angular/http';
import { apiConfig } from '../api.config';

@Injectable()
export class ScotchesService {
  private _baseURL = apiConfig.scotchesURL;
  constructor (private _http: Http) {}

/*** Scotch stuff ********************************/

  create(scotch: any): Observable<any> {
    return this._http
      .post(this._baseURL, scotch)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

  read(scotchId: string): Observable<any> {
    return this._http
      .get(`${this._baseURL}/${scotchId}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  update(scotch: any): Observable<any> {
    return this._http
      .put(`${this._baseURL}/${scotch._id}`, scotch)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

  delete(scotchId: any): Observable<any> {
    return this._http
      .delete(`${this._baseURL}/${scotchId}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  list(): Observable<any> {
    return this._http
      .get(this._baseURL)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

/*** Note stuff  ******************************/

  addNote(scotchId: string, note: any): Observable<any> {
    return this._http
      .post(`${this._baseURL}/notes/${scotchId}`, note)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

  updateNote(scotchId: string, note: any): Observable<any> {
    return this._http
      .put(`${this._baseURL}/notes/${scotchId}`, note)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

  deleteNote(scotchId: string, note: any): Observable<any> {
    return this._http
      .delete(`${this._baseURL}/notes/${scotchId}`, note)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

/*** Tasting Stuff *********************************************/

  addTasting(scotchId: string, tasting: any): Observable<any> {
    return this._http
      .post(`${this._baseURL}/tastings/${scotchId}`, tasting)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

  updateTasting(scotchId: string, tasting: any): Observable<any> {
    return this._http
      .put(`${this._baseURL}/tastings/${scotchId}`, tasting)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

  deleteTasting(scotchId: string, tasting: any): Observable<any> {
    return this._http
      .delete(`${this._baseURL}/tastings/${scotchId}`, tasting)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

/*** Wishlist stuff **************************************/

  addWishlist(scotchId: string, wishlist: any): Observable<any> {
    return this._http
      .post(`${this._baseURL}/wishlists/${scotchId}`, wishlist)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

  deleteWishlist(scotchId: string, wishlist: any): Observable<any> {
    return this._http
      .delete(`${this._baseURL}/wishlists/${scotchId}`, wishlist)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }


/***  Error Handling **************************************/

  private handleError(error: Response) {
    return Observable.throw(error.json().message || 'Server error');
  }
}

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';
import {Http, Headers, Request, RequestMethod, Response} from '@angular/http';
import { apiConfig } from '../api.config';

@Injectable()
export class StylesService {
  private _baseURL = apiConfig.stylesURL;
  constructor (private _http: Http) {}

/*** Style stuff ********************************/

  create(style: any): Observable<any> {
    return this._http
      .post(this._baseURL, style)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

  read(styleId: string): Observable<any> {
    return this._http
      .get(`${this._baseURL}/${styleId}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  update(style: any): Observable<any> {
    return this._http
      .put(`${this._baseURL}/${style._id}`, style)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

  delete(styleId: any): Observable<any> {
    return this._http
      .delete(`${this._baseURL}/${styleId}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  list(): Observable<any> {
    return this._http
      .get(this._baseURL)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getStyleId(style: string): Observable<any> {
    return this._http
      .get(`${this._baseURL}/byName/${style}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

/***  Error Handling **************************************/

  private handleError(error: Response) {
    return Observable.throw(error.json().message || 'Server error');
  }
}

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';
import {Http, Headers, Request, RequestMethod, Response} from '@angular/http';
import { apiConfig } from '../api.config';

@Injectable()
export class RegionsService {
  private _baseURL = apiConfig.regionsURL;
  constructor (private _http: Http) {}

/*** Regions stuff ********************************/

  create(region: any): Observable<any> {
    return this._http
      .post(this._baseURL, region)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

  read(regionId: string): Observable<any> {
    return this._http
      .get(`${this._baseURL}/${regionId}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  update(region: any): Observable<any> {
    return this._http
      .put(`${this._baseURL}/${region._id}`, region)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

  delete(regionId: any): Observable<any> {
    return this._http
      .delete(`${this._baseURL}/${regionId}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  list(): Observable<any> {
    return this._http
      .get(this._baseURL)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getRegionsId(region: string): Observable<any> {
    return this._http
      .get(`${this._baseURL}/byName/${region}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

/***  Error Handling **************************************/

  private handleError(error: Response) {
    return Observable.throw(error.json().message || 'Server error');
  }
}

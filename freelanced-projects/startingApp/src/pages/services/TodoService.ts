import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TodoService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) { }

  public signupUser(user): Observable<any> {
    return this._http.post('http://localhost:3000/signup', user, this.options).map((response: Response) => <any>response.json());
  }

  public saveImage(info) {
    return this._http.post('http://localhost:3000/save-image', info, this.options).map(function (response) { return response.json(); });
  }
}
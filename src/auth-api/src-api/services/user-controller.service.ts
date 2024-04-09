/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { edit } from '../fn/user-controller/edit';
import { Edit$Params } from '../fn/user-controller/edit';
import { index } from '../fn/user-controller/index';
import { Index$Params } from '../fn/user-controller/index';
import { IResponse } from '../models/i-response';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `index()` */
  static readonly IndexPath = '/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `index()` instead.
   *
   * This method doesn't expect any request body.
   */
  index$Response(params?: Index$Params, context?: HttpContext): Observable<StrictHttpResponse<IResponse>> {
    return index(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `index$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  index(params?: Index$Params, context?: HttpContext): Observable<IResponse> {
    return this.index$Response(params, context).pipe(
      map((r: StrictHttpResponse<IResponse>): IResponse => r.body)
    );
  }

  /** Path part for operation `edit()` */
  static readonly EditPath = '/user/edit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `edit()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  edit$Response(params: Edit$Params, context?: HttpContext): Observable<StrictHttpResponse<IResponse>> {
    return edit(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `edit$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  edit(params: Edit$Params, context?: HttpContext): Observable<IResponse> {
    return this.edit$Response(params, context).pipe(
      map((r: StrictHttpResponse<IResponse>): IResponse => r.body)
    );
  }

}

/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IResponse } from '../../models/i-response';

export interface Logout$Params {
}

export function logout(http: HttpClient, rootUrl: string, params?: Logout$Params, context?: HttpContext): Observable<StrictHttpResponse<IResponse>> {
  const rb = new RequestBuilder(rootUrl, logout.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<IResponse>;
    })
  );
}

logout.PATH = '/auth/logout';

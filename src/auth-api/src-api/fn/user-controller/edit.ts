/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IResponse } from '../../models/i-response';
import { UserUpdateFields as UserTypeUserUpdateFields } from '../../models/UserType/user-update-fields';

export interface Edit$Params {
      body: UserTypeUserUpdateFields
}

export function edit(http: HttpClient, rootUrl: string, params: Edit$Params, context?: HttpContext): Observable<StrictHttpResponse<IResponse>> {
  const rb = new RequestBuilder(rootUrl, edit.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
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

edit.PATH = '/user/edit';

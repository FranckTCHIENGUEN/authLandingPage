/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IResponse } from '../../models/i-response';
import { ChangePasswordFields as UserTypeChangePasswordFields } from '../../models/UserType/change-password-fields';

export interface ChangePassword$Params {
      body: UserTypeChangePasswordFields
}

export function changePassword(http: HttpClient, rootUrl: string, params: ChangePassword$Params, context?: HttpContext): Observable<StrictHttpResponse<IResponse>> {
  const rb = new RequestBuilder(rootUrl, changePassword.PATH, 'post');
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

changePassword.PATH = '/auth/change_password';

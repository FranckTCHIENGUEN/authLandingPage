/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IResponse } from '../../models/i-response';
import { VerifyOtp as UserTypeVerifyOtp } from '../../models/UserType/verify-otp';

export interface VerifyOtp$Params {
      body: UserTypeVerifyOtp
}

export function verifyOtp(http: HttpClient, rootUrl: string, params: VerifyOtp$Params, context?: HttpContext): Observable<StrictHttpResponse<IResponse>> {
  const rb = new RequestBuilder(rootUrl, verifyOtp.PATH, 'post');
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

verifyOtp.PATH = '/auth/verify-otp';

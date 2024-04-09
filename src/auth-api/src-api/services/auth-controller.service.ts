/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { changePassword } from '../fn/auth-controller/change-password';
import { ChangePassword$Params } from '../fn/auth-controller/change-password';
import { forgotPassword } from '../fn/auth-controller/forgot-password';
import { ForgotPassword$Params } from '../fn/auth-controller/forgot-password';
import { IResponse } from '../models/i-response';
import { login } from '../fn/auth-controller/login';
import { Login$Params } from '../fn/auth-controller/login';
import { logout } from '../fn/auth-controller/logout';
import { Logout$Params } from '../fn/auth-controller/logout';
import { register } from '../fn/auth-controller/register';
import { Register$Params } from '../fn/auth-controller/register';
import { resendotp } from '../fn/auth-controller/resendotp';
import { Resendotp$Params } from '../fn/auth-controller/resendotp';
import { verifyOtp } from '../fn/auth-controller/verify-otp';
import { VerifyOtp$Params } from '../fn/auth-controller/verify-otp';

@Injectable({ providedIn: 'root' })
export class AuthControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<IResponse>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: Login$Params, context?: HttpContext): Observable<IResponse> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<IResponse>): IResponse => r.body)
    );
  }

  /** Path part for operation `forgotPassword()` */
  static readonly ForgotPasswordPath = '/auth/forgot_password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  forgotPassword$Response(params: ForgotPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<IResponse>> {
    return forgotPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  forgotPassword(params: ForgotPassword$Params, context?: HttpContext): Observable<IResponse> {
    return this.forgotPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<IResponse>): IResponse => r.body)
    );
  }

  /** Path part for operation `verifyOtp()` */
  static readonly VerifyOtpPath = '/auth/verify-otp';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verifyOtp()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verifyOtp$Response(params: VerifyOtp$Params, context?: HttpContext): Observable<StrictHttpResponse<IResponse>> {
    return verifyOtp(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `verifyOtp$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verifyOtp(params: VerifyOtp$Params, context?: HttpContext): Observable<IResponse> {
    return this.verifyOtp$Response(params, context).pipe(
      map((r: StrictHttpResponse<IResponse>): IResponse => r.body)
    );
  }

  /** Path part for operation `resendotp()` */
  static readonly ResendotpPath = '/auth/resend-otp';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resendotp()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resendotp$Response(params: Resendotp$Params, context?: HttpContext): Observable<StrictHttpResponse<IResponse>> {
    return resendotp(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resendotp$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resendotp(params: Resendotp$Params, context?: HttpContext): Observable<IResponse> {
    return this.resendotp$Response(params, context).pipe(
      map((r: StrictHttpResponse<IResponse>): IResponse => r.body)
    );
  }

  /** Path part for operation `changePassword()` */
  static readonly ChangePasswordPath = '/auth/change_password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword$Response(params: ChangePassword$Params, context?: HttpContext): Observable<StrictHttpResponse<IResponse>> {
    return changePassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword(params: ChangePassword$Params, context?: HttpContext): Observable<IResponse> {
    return this.changePassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<IResponse>): IResponse => r.body)
    );
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<IResponse>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<IResponse> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<IResponse>): IResponse => r.body)
    );
  }

  /** Path part for operation `logout()` */
  static readonly LogoutPath = '/auth/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout$Response(params?: Logout$Params, context?: HttpContext): Observable<StrictHttpResponse<IResponse>> {
    return logout(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logout$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout(params?: Logout$Params, context?: HttpContext): Observable<IResponse> {
    return this.logout$Response(params, context).pipe(
      map((r: StrictHttpResponse<IResponse>): IResponse => r.body)
    );
  }

}

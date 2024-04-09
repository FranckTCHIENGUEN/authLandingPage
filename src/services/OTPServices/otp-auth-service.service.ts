import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {slideFields} from "../../app/components/slider/slider.component";
import {LoginFields} from "../../auth-api/src-api/models/UserType/login-fields";
import {IResponse} from "../../auth-api/src-api/models/i-response";
import {Observable} from "rxjs";
import {UserUpdateFields} from "../../auth-api/src-api/models/UserType/user-update-fields";
import {UserCreateFields} from "../../auth-api/src-api/models/UserType/user-create-fields";
import {VerifyOtp} from "../../auth-api/src-api/models/UserType/verify-otp";
import {ResendOtp} from "../../auth-api/src-api/models/UserType/resend-otp";

@Injectable({
  providedIn: 'root'
})
export class OtpAuthServiceService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:3001/api';

  login(authReques:LoginFields){
    return this.http.post(this.baseUrl+'/login',authReques) as Observable<IResponse>
  }
  editUser(authReques:UserUpdateFields){
    return this.http.put(this.baseUrl+'/edit',authReques) as Observable<IResponse>
  }
  register(authReques:UserCreateFields){
    return this.http.post(this.baseUrl+'/register',authReques) as Observable<IResponse>
  }
  verifyOtp(authReques:VerifyOtp){
    return this.http.post(this.baseUrl+'/verify-otp',authReques) as Observable<IResponse>
  }
  resendOtp(authReques:ResendOtp){
    return this.http.post(this.baseUrl+'/resend-otp',authReques) as Observable<IResponse>
  }
  logout(){
    return this.http.get(this.baseUrl+'/logout') as Observable<IResponse>
  }
}

import { Injectable } from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
private _otpAuth = false;
  constructor() { }

  setOtpAuth(value: boolean) {

    sessionStorage.setItem('otpMode', String(value));
  }

  isOtp(){

    return !!sessionStorage.getItem('otpMode');

  }
  isOtpLogin(){

    if (sessionStorage.getItem('otpMode')){
      let otpMode = JSON.parse(sessionStorage.getItem('otpMode') as string) ;

      if (otpMode){
        return false
      }
    }else {
      return false
    }

    return true;

  }
}

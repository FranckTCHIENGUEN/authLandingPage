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
      let otpMode = sessionStorage.getItem('otpMode') as unknown as boolean;

      if (otpMode){
        return false
      }
    }else {
      return false
    }

    return true;

  }
}

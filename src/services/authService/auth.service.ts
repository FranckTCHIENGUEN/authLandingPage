import { Injectable } from '@angular/core';
import {AuthControllerService} from "../../auth-api/src-api/services/auth-controller.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {LoginFields} from "../../auth-api/src-api/models/UserType/login-fields";
import {IResponse} from "../../auth-api/src-api/models/i-response";
import {VerifyOtp} from "../../auth-api/src-api/models/UserType/verify-otp";
import {ResendOtp} from "../../auth-api/src-api/models/UserType/resend-otp";
import {UserCreateFields} from "../../auth-api/src-api/models/UserType/user-create-fields";
import {ForgotPasswordFields} from "../../auth-api/src-api/models/UserType/forgot-password-fields";
import {ChangePasswordFields} from "../../auth-api/src-api/models/UserType/change-password-fields";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authController:AuthControllerService,
              private router:Router) { }

  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  login(autRequest: LoginFields):Observable<IResponse>{
    return this.authController.login({body: autRequest});
  }
  changePass(autRequest: ChangePasswordFields):Observable<IResponse>{
    return this.authController.changePassword({body: autRequest});
  }
  forgotPass(autRequest: ForgotPasswordFields):Observable<IResponse>{
    return this.authController.forgotPassword({body: autRequest});
  }
  register(autRequest: UserCreateFields):Observable<IResponse>{

    return this.authController.register({body: autRequest});
  }

  verifyOtp(verifyOtpFiedls:VerifyOtp ):Observable<IResponse>{
    return this.authController.verifyOtp({body: verifyOtpFiedls});
  }
  resendOtp(resendOtp:ResendOtp ):Observable<IResponse>{
    return this.authController.resendotp({body: resendOtp});
  }
  disconect():Observable<IResponse>{
   return  this.authController.logout();
  }

  setConnectedUser(authenticationResponse:IResponse){
    sessionStorage.setItem("connectedUser", JSON.stringify(authenticationResponse.data));
  }

  loadHome(authRequest: IResponse){
    // if (sessionStorage.getItem("connectedUser")){
    //
    //   this.appUtilisateurService.findByEmail(authRequest?.login as string)
    //     .subscribe(utilisateurDto=>{
    //       sessionStorage.setItem("userData", JSON.stringify(utilisateurDto))
    //
    //       if (utilisateurDto.passwordState == "DEFAULT"){
    //
    //         this.router.navigate(["register"])
    //       }
    //       else if (utilisateurDto.passwordState == "PERSONAL"){
    //
    //         this.router.navigate(["mainPage"])
    //       }
    //       else {
    //         this.router.navigate(['']);
    //
    //       }
    //       return true;
    //     }, error => {
    //       return false;
    //     })
    //
    // }
  }

   isUserLogedAndTokenValid(){
    let authResponse:any = {};
    authResponse = JSON.parse(sessionStorage.getItem('connectedUser') as string);
    if (authResponse?.token !=null){
      const expiry = (JSON.parse(atob(authResponse.token!.split('.')[1]))).exp;
      return expiry * 1000 > Date.now();
    }
    // this.router.navigate(['home'])
    return false;
  }

}

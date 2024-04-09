import { Injectable } from '@angular/core';
import {IResponse} from "../../auth-api/src-api/models/i-response";
import {UserControllerService} from "../../auth-api/src-api/services/user-controller.service";
import {ChangePasswordFields} from "../../auth-api/src-api/models/UserType/change-password-fields";
import {Observable} from "rxjs";
import {UserCreateFields} from "../../auth-api/src-api/models/UserType/user-create-fields";

@Injectable({
  providedIn: 'root'
})
export class AppUserServiceService {

  constructor(private userService:UserControllerService) { }

  isUserLogedAndTokenValid(){
    let authResponse=  JSON.parse(sessionStorage.getItem('connectedUser') as string);
    if (authResponse.token !=null){
      const expiry = (JSON.parse(atob(authResponse.token!.split('.')[1]))).exp;
      return expiry * 1000 > Date.now();
    }
    return false;
  }

  userCreate(autRequest: UserCreateFields):Observable<IResponse>{
    return this.userService.edit({body: autRequest});
  }
}

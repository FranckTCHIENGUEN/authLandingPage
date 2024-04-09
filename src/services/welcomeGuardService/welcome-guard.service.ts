import { Injectable } from '@angular/core';
import {AppService} from "../app.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuardService implements CanActivate{

  constructor(private appService:AppService,
              private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let response = this.appService.isOtp();
    if (!response){
      console.log(response)
      this.router.navigate([''])
    }

    return this.appService.isOtp();
  }
}

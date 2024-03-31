import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../authService/auth.service";

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private userAuthService:AuthService,
              private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let response = this.userAuthService.isUserLogedAndTokenValid();
    if (!response){
      console.log(response)
      this.router.navigate(['login'])
    }

    return this.userAuthService.isUserLogedAndTokenValid();
  }
}

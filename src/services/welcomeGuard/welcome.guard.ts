import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {inject} from "@angular/core";
import {AppService} from "../app.service";

export const welcomeGuard: CanActivateFn = (route, state) => {
  const appService = inject(AppService);
  const router = inject(Router);
  let response = appService.isOtp();
  if (!response){
    console.log(response)
    router.navigate([''])
  }

  return appService.isOtp();
};

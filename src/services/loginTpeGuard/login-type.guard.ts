import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AppService} from "../app.service";

export const loginTypeGuard: CanActivateFn = (route, state) => {

  const appService = inject(AppService);
  const router = inject(Router);
  let response = appService.isOtpLogin();
  if (!response){
    router.navigate([''])
  }

  return appService.isOtpLogin();
};

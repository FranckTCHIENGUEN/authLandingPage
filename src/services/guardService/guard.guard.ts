import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../authService/auth.service";


export const guardGuard: CanActivateFn = (route, state) => {
  const authService:AuthService = inject(AuthService);
  const router = inject(Router);
  let response = authService.isUserLogedAndTokenValid();

  if (!response){
    console.log(response)
    router.navigate(['login'])
    return false;
  }

  return true;
};

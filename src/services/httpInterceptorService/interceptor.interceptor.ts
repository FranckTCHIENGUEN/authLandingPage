import { HttpInterceptorFn } from '@angular/common/http';
import {LoaderService} from "../loadeerService/loader.service";
import {Router} from "@angular/router";
import {AppUserServiceService} from "../userService/app-user-service.service";
import {inject} from "@angular/core";
import {finalize} from "rxjs";
import {AppService} from "../app.service";

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {

    let totalRequests = 0;
    const loaderService = inject(LoaderService);
    const router = inject(Router) ;
    const userAuthService = inject(AppUserServiceService);
    const appService = inject(AppService);

  totalRequests++;
  loaderService.show();

  let authResponse = JSON.parse(sessionStorage.getItem('connectedUser') as string) ;
  if (sessionStorage.getItem("connectedUser")){
    if (userAuthService.isUserLogedAndTokenValid()){
      // authResponse = JSON.parse(sessionStorage.getItem('connectedUser') as string);
      const authRequest = req.clone(
        {
          setHeaders :
            {
              Authorization: "Bearer " + authResponse.token
            }
        }
      );
      return next(authRequest).pipe(
        finalize(() =>  {
          totalRequests--;
          if (totalRequests == 0) {
            loaderService.hide()
          }
        })
      );
    }
    else {
      return next(req).pipe(
        finalize(() =>  {
          totalRequests--;
          if (totalRequests == 0) {
            loaderService.hide()
          }
        })
      );
    }

  }
  else {
    // router.navigate(['']);
    return next(req).pipe(
      finalize(() =>  {
        totalRequests--;
        if (totalRequests == 0) {
          loaderService.hide()
        }
      })
    );
  }
};

// return next(authReq).pipe(
//   catchError((err: any) => {
//     if (err instanceof HttpErrorResponse) {
//       // Handle HTTP errors
//       if (err.status === 401) {
//         // Specific handling for unauthorized errors
//         console.error('Unauthorized request:', err);
//         // You might trigger a re-authentication flow or redirect the user here
//       } else {
//         // Handle other HTTP error codes
//         console.error('HTTP error:', err);
//       }
//     } else {
//       // Handle non-HTTP errors
//       console.error('An error occurred:', err);
//     }
//
//     // Re-throw the error to propagate it further
//     return throwError(() => err);
//   })
// );;

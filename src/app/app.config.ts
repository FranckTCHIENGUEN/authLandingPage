import {ApplicationConfig, LOCALE_ID} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {LoaderService} from "../services/loadeerService/loader.service";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from "@angular/common/http";
import {interceptorInterceptor} from "../services/httpInterceptorService/interceptor.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([interceptorInterceptor])),
    { provide: LOCALE_ID, useValue: 'fr-CMR'},
    LoaderService,

    provideRouter(routes),

    provideAnimationsAsync()
  ]
};

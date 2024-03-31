import { Routes } from '@angular/router';
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {ForgotPasswordPageComponent} from "./pages/forgot-password-page/forgot-password-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {VerifyOtpPageComponent} from "./pages/verify-otp-page/verify-otp-page.component";
import {guardGuard} from "../services/guardService/guard.guard";
import {GuardService} from "../services/guard/guard.service";
import {ChangePassComponent} from "./pages/change-pass/change-pass.component";


const title:String = "DIGISOFT"
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch:"full"
  },

  {
    path: 'login',
    title:"Login - "+title,
    component: LoginPageComponent
  },
  {
    path: 'register',
    title:"Register - "+title,
    component: RegisterPageComponent
  },
  {
    path: 'forgot-pass',
    component: ForgotPasswordPageComponent
  },
  {
    path: 'verification/:email/:type',
    component: VerifyOtpPageComponent
  },
  {
    path: 'home',
    title:"Home - "+title,
    canActivate:[GuardService],
    component: HomePageComponent
  },
  {
    path: 'new-pass',
    title:"New pass - "+title,
    canActivate:[GuardService],
    component: ChangePassComponent
  }
];

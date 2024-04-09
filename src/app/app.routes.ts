import { Routes } from '@angular/router';
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {ForgotPasswordPageComponent} from "./pages/forgot-password-page/forgot-password-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {VerifyOtpPageComponent} from "./pages/verify-otp-page/verify-otp-page.component";
import {GuardService} from "../services/guard/guard.service";
import {ChangePassComponent} from "./pages/change-pass/change-pass.component";
import {WelcomePageComponent} from "./pages/welcome-page/welcome-page.component";
import {welcomeGuard} from "../services/welcomeGuard/welcome.guard";
import {loginTypeGuard} from "../services/loginTpeGuard/login-type.guard";


const title:String = "DIGISOFT"
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch:"full"
  },

  {
    path: 'welcome',
    title:"Welcome - "+title,
    component: WelcomePageComponent
  },
  {
    path: 'login',
    title:"Login - "+title,
    canActivate:[welcomeGuard],
    component: LoginPageComponent
  },
  {
    path: 'register',
    title:"Register - "+title,
    canActivate:[welcomeGuard],
    component: RegisterPageComponent
  },
  {
    path: 'forgot-pass',
    canActivate:[welcomeGuard, loginTypeGuard],
    component: ForgotPasswordPageComponent
  },
  {
    path: 'verification/:email/:type',
    canActivate:[welcomeGuard],
    component: VerifyOtpPageComponent
  },
  {
    path: 'home',
    title:"Home - "+title,
    canActivate:[welcomeGuard,GuardService],
    component: HomePageComponent
  },
  {
    path: 'new-pass',
    title:"New pass - "+title,
    canActivate:[welcomeGuard,loginTypeGuard, GuardService],
    component: ChangePassComponent
  }
];

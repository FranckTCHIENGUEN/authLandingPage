import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MyErrorStateMatcher} from "../../ErrorMatcher";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatButton} from "@angular/material/button";
import {MatError} from "@angular/material/form-field";
import {Router} from "@angular/router";
import {LoginFields} from "../../../auth-api/src-api/models/UserType/login-fields";
import {ForgotPasswordFields} from "../../../auth-api/src-api/models/UserType/forgot-password-fields";
import {AuthService} from "../../../services/authService/auth.service";
import {MatIcon} from "@angular/material/icon";
import {VerifType} from "../../../auth-api/src-api/models";
import {AppLoaderComponent} from "../../components/app-loader/app-loader.component";

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatCardContent,
    MatGridList,
    MatGridTile,
    MatCard,
    MatError,
    MatIcon,
    MatCardTitle,
    MatLabel,
    MatCardTitleGroup,
    MatCardSubtitle,
    MatButton,
    MatCardFooter,
    MatIcon,
    AppLoaderComponent
  ],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.scss'
})
export class ForgotPasswordPageComponent {
  loginForm = this.formBuilder.group({
    mail:['',[Validators.required, Validators.email]],
  });

  errorMessageEmail: string = "";
   errorMessageRequired: string ="";

  constructor(private formBuilder :FormBuilder, private router:Router,
              private authService:AuthService) {
    merge(this.loginForm.statusChanges, this.loginForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.loginForm.controls.mail.hasError('required') ) {
      this.errorMessageRequired = 'You must enter a value';
    }
    else if (this.loginForm.controls.mail.hasError('email')) {
      this.errorMessageEmail = 'Enter a valid email';
    }
    else {
      this.errorMessageRequired = '';
      this.errorMessageEmail = '';
    }
  }


  matcher = new MyErrorStateMatcher();
  message='';
  error=false;

  formSubmit() {
    if (this.loginForm.valid){

      let login:ForgotPasswordFields ={
        email: this.loginForm.controls.mail.value!,
      };

      this.authService.forgotPass(login)
        .subscribe(
          data =>{

            if (data.code == 5000){
              this.error=false;
              this.router.navigate(["verification", login.email, VerifType.ForgotPass])
            }else{
              this.error = true;
              this.message = data.message!;
            }

            // this.authService.setConnectedUser(data);
            // if (this.authService.isUserLogedAndTokenValid()){
            //   this.authService.loadHome(login);
            // }
          },
          error =>{
            this.error = true
            console.log(error);
          }
        );
    }
  }

  back() {
    this.router.navigate(['login'])
  }
}

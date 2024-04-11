import {Component} from '@angular/core';
import {MyErrorStateMatcher} from "../../ErrorMatcher";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {MatError, MatFormField, MatHint} from "@angular/material/form-field";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";
import {LoginFields} from "../../../auth-api/src-api/models/UserType/login-fields";
import {AuthService} from "../../../services/authService/auth.service";
import {VerifType} from "../../../auth-api/src-api/models/verif-type";
import {MatCheckbox} from "@angular/material/checkbox";
import {AppLoaderComponent} from "../../components/app-loader/app-loader.component";
import {AppService} from "../../../services/app.service";
import {OtpAuthServiceService} from "../../../services/OTPServices/otp-auth-service.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
    imports: [
        MatGridList,
        MatGridTile,
        MatCard,
        MatCardTitleGroup,
        MatCardSubtitle,
        MatCardContent,
        MatFormField,
        ReactiveFormsModule,
        MatInput,
        MatIconButton,
        MatIcon,
        MatError,
        MatCardTitle,
        MatAnchor,
        MatHint,
        MatLabel,
        RouterLink,
        MatButton,
        MatCardFooter,
        MatCheckbox,
        AppLoaderComponent
    ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent{
  loginForm = this.formBuilder.group({
    email:['',[Validators.required, Validators.email]],
    passWord:[''],
    hide:false
  });

   errorMessageEmail: string = "";
   errorMessageRequired: string = "";
   error: boolean = false;
    message: string = "";
    otpMode:boolean = true;

  constructor(private formBuilder :FormBuilder,private router:Router,
              private appService:AppService,
              private  otpService:OtpAuthServiceService,
              private authService:AuthService) {

    this.otpMode = JSON.parse(sessionStorage.getItem('otpMode') as string )
    sessionStorage.removeItem('connectedUser')
    merge(this.loginForm.statusChanges, this.loginForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }


  back() {
      this.router.navigate(['welcome'])
  }
  updateErrorMessage() {
    if (this.loginForm.controls.email.hasError('required') ||
      this.loginForm.controls.passWord.hasError('required')) {
      this.errorMessageRequired = 'You must enter a value';
    }
    else if (this.loginForm.controls.email.hasError('email')) {
      this.errorMessageEmail = 'Enter a valid email';
    }
    else {
      this.errorMessageRequired = '';
      this.errorMessageEmail = '';
    }
  }


  matcher = new MyErrorStateMatcher();
  hide = true;
  login='';
  pass='';

  formSubmit() {
    this.error = false;
    if (this.loginForm.valid){

      let login:LoginFields ={
        email: this.loginForm.controls.email.value!,
        password: this.loginForm.controls.passWord.value!
      };

      if (this.otpMode){
        this.otpService.login(login)
          .subscribe(
            data =>{
              this.requestResponse(data, login.email);
            },
            error =>{
              this.error = true
              console.log(error);
            }
          );
      }
      else {
        this.authService.login(login)
          .subscribe(
            data =>{

              this.requestResponse(data, login.email);
            },
            error =>{
              this.error = true
              console.log(error);
            }
          );
      }

    }
  }

  private requestResponse(data:any, email:string){
    if (data.code == 5000){
      this.error=false;
      this.router.navigate(["verification", email, VerifType.Login])
    }else{

      console.log(this.otpMode)
      this.error = true;
      this.message = data.message!;
    }
  }

}

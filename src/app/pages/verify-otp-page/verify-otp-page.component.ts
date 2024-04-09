import {Component} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatInput} from "@angular/material/input";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MyErrorStateMatcher} from "../../ErrorMatcher";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/authService/auth.service";
import {VerifyOtp} from "../../../auth-api/src-api/models/UserType/verify-otp";
import {VerifType} from "../../../auth-api/src-api/models";
import {ResendOtp} from "../../../auth-api/src-api/models/UserType/resend-otp";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {AppLoaderComponent} from "../../components/app-loader/app-loader.component";
import {OtpAuthServiceService} from "../../../services/OTPServices/otp-auth-service.service";

@Component({
  selector: 'app-verify-otp-page',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardTitleGroup,
    MatCardSubtitle,
    MatCardContent,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatInput,
    MatIcon,
    MatCardTitle,
    MatFormField,
    MatCardFooter,
    MatButton,
    AppLoaderComponent
  ],
  templateUrl: './verify-otp-page.component.html',
  styleUrl: './verify-otp-page.component.scss'
})
export class VerifyOtpPageComponent {
  verifyForm = this.formBuilder.group({
    otp:['',[Validators.required,]],
  });

  errorMessageEmail: string = "";
  errorMessageRequired: string ="";
  error: boolean = false;
   message: string = "";
   email: string = "";
  private type: VerifType;
  otpMode:boolean = false;

  constructor(private formBuilder :FormBuilder,private router:Router,
              private authService:AuthService,
              private otpService:OtpAuthServiceService,
              private dialog:MatDialog,
              private _Activatedroute:ActivatedRoute) {

    this.otpMode = sessionStorage.getItem('otpMode') as unknown as boolean;
    this.email = this._Activatedroute.snapshot.paramMap.get("email")!
    this.type = this._Activatedroute.snapshot.paramMap.get("type") as VerifType

    console.log(this.type)

    merge(this.verifyForm.statusChanges, this.verifyForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.verifyForm.controls.otp.hasError('required') ) {
      this.errorMessageRequired = 'You must enter a value';
    }else {
      this.errorMessageRequired = '';
    }
  }


  matcher = new MyErrorStateMatcher();

  back() {

    if (this.type == VerifType.Login){
      this.router.navigate(['login'])
    }
    if (this.type == VerifType.ForgotPass){
      this.router.navigate(['forgot-pass'])
    }
  }
  formSubmit() {
    this.error = false
    if (this.verifyForm.valid){

      let verify:VerifyOtp ={
        otp: this.verifyForm.controls.otp.value as string,
        verificationType: this.type,
        email: this.email
      };

      if (this.otpMode){
        this.otpService.verifyOtp(verify)
          .subscribe(
            data =>{

              this.responseSend(data);
            },
            error =>{
              this.error = true
              console.log(error);
            }
          );
      } else {
        this.authService.verifyOtp(verify)
          .subscribe(
            data =>{

              this.responseSend(data);
            },
            error =>{
              this.error = true
              console.log(error);
            }
          );
      }


    }
  }

  private responseSend(data:any){
    if (data.code == 5000){
      this.error=false;
      if (this.type == VerifType.Login){
        this.authService.setConnectedUser(data);
        this.router.navigate(["home"]);
      }
      if (this.type == VerifType.ForgotPass){
        this.router.navigate(['new-pass'])
      }

    }else{
      this.error = true;
      this.message = data.message!;
    }
  }
  responseResend(data:any){
    this.dialog.open(ConfirmDialogComponent, {
      disableClose:false,
      data: {
        message: "The new OTP was send to your phone number ",
      },
    }).afterClosed().subscribe(value => {
      this.error = false
      this.verifyForm.reset();
    });
  }
  resendSubmit() {
    if (this.verifyForm.valid){

      let resendOtp:ResendOtp ={
        email: this.email
      };
      if (this.otpMode){
        this.otpService.resendOtp(resendOtp)
          .subscribe(
            data =>{

              this.responseResend(data)
            },
            error =>{
              this.error = true
              console.log(error);
            }
          );
      }else {
        this.authService.resendOtp(resendOtp)
          .subscribe(
            data =>{

              this.responseResend(data)
            },
            error =>{
              this.error = true
              console.log(error);
            }
          );
      }

    }
  }
}

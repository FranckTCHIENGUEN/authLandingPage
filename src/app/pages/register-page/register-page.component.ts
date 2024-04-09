import { Component } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {MatAnchor, MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatHint, MatInput, MatLabel, MatPrefix, MatSuffix} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MyErrorStateMatcher} from "../../ErrorMatcher";
import {confirmPassValidator, createPasswordStrengthValidator} from "../../../utilis/validation";
import {MatIcon} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";
import {MatError} from "@angular/material/form-field";
import {LoginFields} from "../../../auth-api/src-api/models/UserType/login-fields";
import {UserCreateFields} from "../../../auth-api/src-api/models/UserType/user-create-fields";
import {AuthService} from "../../../services/authService/auth.service";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatOption, MatSelect, MatSelectTrigger} from "@angular/material/select";
import {countries} from "../../../utilis/countries";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatTooltip} from "@angular/material/tooltip";
import {AppLoaderComponent} from "../../components/app-loader/app-loader.component";
import {OtpAuthServiceService} from "../../../services/OTPServices/otp-auth-service.service";
import {IResponse} from "../../../auth-api/src-api/models/i-response";

export interface countryInterface{
  calling_code:string,
  name:string,
  flag:string
}
@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    MatCardFooter,
    MatButton,
    MatAnchor,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatCardTitle,
    MatFormField,
    MatCardContent,
    MatCardSubtitle,
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardTitleGroup,
    MatIconButton,
    MatIcon,
    RouterLink,
    MatCheckbox,
    MatHint,
    MatSelect,
    MatPrefix,
    MatSelectTrigger,
    MatOption,
    MatFabButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatTooltip,
    MatSuffix,
    AppLoaderComponent
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {

  registerForm = this.formBuilder.group({
    mail:['',[Validators.required, Validators.email]],
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required]],
    phone:['',[Validators.required]],

  });

  passForm = this.formBuilder.group({
    password: ['', Validators.compose([Validators.required, Validators.minLength(8), createPasswordStrengthValidator()])],
    confirmPassword: ['', Validators.compose([Validators.required,])],

  }, {
    validators: confirmPassValidator()
  });

  errorMessageEmail: string = "";
  errorMessageRequired: string = "";
   dis: boolean = false;
   errorMessagePass: string = "";
  error: boolean = false;
   message: string = "";
   dataEror: any;
   otpMode: boolean;

  constructor(private formBuilder :FormBuilder, private authService:AuthService,
              private dialog: MatDialog,
              private otpService:OtpAuthServiceService,
              private router:Router) {

    this.otpMode = sessionStorage.getItem('otpMode') as unknown as boolean;
    merge(this.registerForm.statusChanges, this.registerForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  getPassValid(){
    return !!(this.registerForm.errors != null && this.registerForm.errors['passValid']);

  }

  updateErrorMessage() {
    if (this.registerForm.controls.mail.hasError('required') ||
      this.passForm.controls.password.hasError('required') ||
      this.registerForm.controls.phone.hasError('required') ||
      this.passForm.controls.confirmPassword.hasError('required') ||
      this.registerForm.controls.lastName.hasError('required') ||
      this.registerForm.controls.firstName.hasError('required')) {
      this.errorMessageRequired = 'You must enter a value';
    }
    else if (this.registerForm.controls.mail.hasError('email')) {
      this.errorMessageEmail = 'Enter a valid email';
    }
    else if (this.passForm.controls.password.hasError('minLength')) {
      this.errorMessagePass = 'your password must have 8 characters';
    }
    else if (this.passForm.controls.password.hasError('passwordStrength')) {
      this.errorMessagePass = 'The password must contains uppercase characters, lowercase characters and number';
    }
    else if (this.getPassValid()) {
      this.errorMessagePass = 'The password must contains uppercase characters, lowercase characters and number';
    }
    else {
      this.errorMessageRequired = '';
      this.errorMessageEmail = '';
      this.errorMessagePass = '';
    }
  }


  matcher = new MyErrorStateMatcher();
  hide = true;
  hide2 = true;
  login='';
  pass='';
  countries: countryInterface[] = countries ;
  region: countryInterface = this.countries.at(30) as countryInterface;

  formSubmit() {
    this.dis = this.getPassValid();
    if (this.registerForm.valid){

      let register:UserCreateFields ={
        phoneNumber: this.registerForm.controls.phone.value!,
        region: this.region.calling_code,
        firstName: this.registerForm.controls.firstName.value!,
        lastName: this.registerForm.controls.lastName.value!,
        email: this.registerForm.controls.mail.value!,
      };

      if (!this.otpMode){
        register.password = this.passForm.controls.password.value!
        this.authService.register(register)
          .subscribe(
            data =>{

              this.requestResponse(data, register.firstName, register.lastName as string);

            },
            error =>{
              this.error = true
              console.log(error);
            }
          );
      }

      if (this.otpMode){
        this.otpService.register(register)
          .subscribe(
            data =>{
              this.requestResponse(data, register.firstName, register.lastName as string);
            },
            error =>{
              this.error = true
              console.log(error);
            }
          );
      }
    }
  }

  regionChange(country: countryInterface) {
    this.region = country;
  }

  private requestResponse(data: IResponse, firstName:string, lastName:string) {

    if (data.code == 5000){
      this.error=false;

      this.dialog.open(ConfirmDialogComponent, {
        disableClose:false,
        data: {
          message: "Welcome to Digisoft " + firstName + " "+lastName,
        },
      }).afterClosed().subscribe(value => {
        this.router.navigate(["login"])
      });

    }
    else if (data.code==5004){
      this.error = true;
      this.message = data.message!;
      this.dataEror = JSON.stringify(data.data)
    }
    else{
      this.error = true;
      this.message = data.message!;
    }
  }
}

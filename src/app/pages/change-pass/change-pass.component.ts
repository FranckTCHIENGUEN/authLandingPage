import { Component } from '@angular/core';
import {ChangePasswordDialogComponent} from "../../components/change-password-dialog/change-password-dialog.component";
import {AppLoaderComponent} from "../../components/app-loader/app-loader.component";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {confirmPassValidator, createPasswordStrengthValidator} from "../../../utilis/validation";
import {MyErrorStateMatcher} from "../../ErrorMatcher";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/authService/auth.service";
import {ChangePasswordFields} from "../../../auth-api/src-api/models/UserType/change-password-fields";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [
    ChangePasswordDialogComponent,
    AppLoaderComponent,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    MatError,
    MatFormField,
    MatGridList,
    MatGridTile,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatIconButton,
    MatSuffix
  ],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.scss'
})
export class ChangePassComponent {
  registerForm = this.formBuilder.nonNullable.group({
    password: ['', Validators.compose([Validators.required, Validators.minLength(8), createPasswordStrengthValidator()])],
    confirmPassword: ['', Validators.compose([Validators.required,])],
  }, {
    validators: [confirmPassValidator()]
  });
  private _isPhonePortrait = false;

  matcher = new MyErrorStateMatcher();
  hide2 = true;


  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router:Router,
    private authService:AuthService,) {

  }

  error = false;
  errorMessageRequired: string = "";
  errorMessagePass: string = "";
  message = '';


  dis = false
  hide3: boolean=true;

  getPassValid(){
    return !!(this.registerForm.errors != null && this.registerForm.errors['passValid']);

  }

  updateErrorMessage() {
    if (this.registerForm.controls.password.hasError('required') ||
      this.registerForm.controls.confirmPassword.hasError('required') ) {
      this.errorMessageRequired = 'You must enter a value';
    }
    else if (this.registerForm.controls.password.hasError('minLength')) {
      this.errorMessagePass = 'your password must have 8 characters';
    }
    else if (this.registerForm.controls.password.hasError('passwordStrength')) {
      this.errorMessagePass = 'The password must contains uppercase characters, lowercase characters and number';
    }
    else if (this.getPassValid()) {
      this.errorMessagePass = 'The password must contains uppercase characters, lowercase characters and number';
    }
    else {
      this.errorMessageRequired = '';
      this.errorMessagePass = '';
    }
  }




  formSubmit() {
    this.dis = this.getPassValid();
    if (this.registerForm.valid){

      let userData = JSON.parse(sessionStorage.getItem('connectedUser') as string) ;

      let user:ChangePasswordFields ={
        email: userData.user.email,
        newPassword: this.registerForm.controls.password.value as string
      };

      this.authService.changePass(user)
        .subscribe(
          data =>{

            if (data.code == 5000){
              this.error=false;


              this.dialog.open(ConfirmDialogComponent, {
                disableClose:false,
                data: {
                  message: "change pass successfully",
                },
              }).afterClosed().subscribe(value => {
                  this.authService.disconect().subscribe(value1 => {
                    if (value1.code == 5000){
                      this.router.navigate(['login'])
                    }else{
                      this.error = true;
                      this.message = value1.message!;
                    }

                  });

                });

            }else{
              this.error = true;
              this.message = data.message!;
            }
          },
          error =>{
            this.error = true
            console.log(error);
          }
        );
    }

  }

  back() {
    this.authService.disconect().subscribe(value1 => {
      if (value1.code == 5000){
        this.router.navigate(['login'])
      }else{
        this.error = true;
        this.message = value1.message!;
      }

    });
  }
}

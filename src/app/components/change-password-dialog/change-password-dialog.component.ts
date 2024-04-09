import {Component, Input} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {confirmPassValidator, createPasswordStrengthValidator, requirement} from "../../../utilis/validation";
import {MyErrorStateMatcher} from "../../ErrorMatcher";
import {MatDialog, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {AppUserServiceService} from "../../../services/userService/app-user-service.service";
import {VerifyOtp} from "../../../auth-api/src-api/models/UserType/verify-otp";
import {VerifType} from "../../../auth-api/src-api/models/verif-type";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {UserCreateFields} from "../../../auth-api/src-api/models/UserType/user-create-fields";
import {ChangePasswordFields} from "../../../auth-api/src-api/models/UserType/change-password-fields";
import {AuthService} from "../../../services/authService/auth.service";
import {Router} from "@angular/router";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
    MatError,
    MatCardTitle,
    MatLabel,
    MatLabel,
    MatCardContent,
    MatCardTitle,
    MatCardFooter,
    MatCard,
    MatCardHeader,
    MatButton,
    MatAnchor,
    MatCheckbox,
    MatHint,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatSuffix
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss'
})
export class ChangePasswordDialogComponent {
  // utilisateurDto: UtilisateurDto = JSON.parse(sessionStorage.getItem("userData") as string);

  @Input() show = true;

  registerForm = this.formBuilder.nonNullable.group({
    oldPass:[''],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8), createPasswordStrengthValidator()])],
    confirmPassword: ['', Validators.compose([Validators.required,])],
    hide3:false,
    hide:false

  }, {
    validators: [confirmPassValidator()]
  });
  private _isPhonePortrait = false;

  matcher = new MyErrorStateMatcher();
  hide = true;
  hide2 = true;


  constructor(
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private router:Router,
              private authService:AuthService,
              private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,) {

  }

  error = false;
  errorMessageRequired: string = "";
  errorMessagePass: string = "";
  message = '';
  get isPhonePortrait(): boolean {
    return this._isPhonePortrait;
  }
  get password() {
    return this.registerForm.controls['password'];
  }

  dis = false
  hide3: boolean=true;

  getPassValid(){
    return !!(this.registerForm.errors != null && this.registerForm.errors['passValid']);

  }

  updateErrorMessage() {
    if (this.registerForm.controls.password.hasError('required') ||
      this.registerForm.controls.confirmPassword.hasError('required') ||
      this.registerForm.controls.oldPass.hasError('required')) {
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


  private closeDialog(param: { etat: string }) {
    this.dialogRef.close(param);
  }

  formSubmit() {
    this.dis = this.getPassValid();
    if (this.registerForm.valid){

        let userData = JSON.parse(sessionStorage.getItem('connectedUser') as string) ;

      let user:ChangePasswordFields ={
        email: userData.user.email,
        newPassword: this.registerForm.controls.password.value as string
      };

      if (this.show){
        user.oldPassword = this.registerForm.controls.oldPass.value;
      }

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
                        this.dialogRef.close();
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
}

import {Component, Inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {confirmPassValidator, createPasswordStrengthValidator} from "../../../utilis/validation";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
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
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {UserCreateFields} from "../../../auth-api/src-api/models/UserType/user-create-fields";
import {AppUserServiceService} from "../../../services/userService/app-user-service.service";
import {ChangePasswordFields} from "../../../auth-api/src-api/models/UserType/change-password-fields";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {OtpAuthServiceService} from "../../../services/OTPServices/otp-auth-service.service";

@Component({
  selector: 'app-edit-data-dialog',
  standalone: true,
  imports: [
    MatAnchor,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardSubtitle,
    MatCardTitleGroup,
    MatFormField,
    MatGridList,
    MatGridTile,
    MatIcon,
    MatIconButton,
    MatInput,
    MatError,
    MatCardTitle,
    MatLabel,
    MatLabel,
    ReactiveFormsModule,
    RouterLink,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle
  ],
  templateUrl: './edit-data-dialog.component.html',
  styleUrl: './edit-data-dialog.component.scss'
})
export class EditDataDialogComponent {
  registerForm = this.formBuilder.group({
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required]],
  });

  errorMessageRequired: string = "";

  user: UserCreateFields ={phoneNumber: "", region: "", email: "", firstName: "", password: ""};
   error: boolean = false;
   message: string = '';
   otpMode:boolean=false;
  constructor(private formBuilder:FormBuilder,
              private dialog: MatDialog,
              private userService:AppUserServiceService,
              private otpService:OtpAuthServiceService,
              private dialogRef: MatDialogRef<EditDataDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {

    if (this.data.person !=null){
      this.user = data.person
      this.registerForm.controls.firstName.setValue( this.user!.firstName)
      this.registerForm.controls.lastName.setValue( this.user!.lastName!)
    }

    this.otpMode = sessionStorage.getItem('otpMode') as unknown as boolean;

    merge(this.registerForm.statusChanges, this.registerForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.registerForm.controls.lastName.hasError('required') ||
      this.registerForm.controls.firstName.hasError('required')) {
      this.errorMessageRequired = 'You must enter a value';
    }
    else {
      this.errorMessageRequired = '';
    }
  }

  formSubmit() {

    if (this.registerForm.valid){

      this.user.lastName = this.registerForm.controls.lastName.value as string;
      this.user.firstName = this.registerForm.controls.firstName.value as string;

      if (this.otpMode){
        this.otpService.editUser(this.user)
          .subscribe(
            data =>{
              this.responseEdit(data)
            },
            error =>{
              this.error = true
              console.log(error);
            }
          );
      }else {
        this.userService.userCreate(this.user)
          .subscribe(
            data =>{
              this.responseEdit(data)
            },
            error =>{
              this.error = true
              console.log(error);
            }
          );
      }

    }

  }

  responseEdit(data:any){
    if (data.code == 5000){
      this.error=false;

      this.dialog.open(ConfirmDialogComponent, {
        disableClose:false,
        data: {
          message: "edit information successfully",
        },
      }).afterClosed().subscribe(value => {
        this.dialogRef.close()
      });

    }else{
      this.error = true;
      this.message = data.message!;
    }
  }
}

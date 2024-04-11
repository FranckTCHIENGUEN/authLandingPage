import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ChangePasswordDialogComponent} from "../../components/change-password-dialog/change-password-dialog.component";
import {EditDataDialogComponent} from "../../components/edit-data-dialog/edit-data-dialog.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButton, MatButtonModule, MatFabButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {UserCreateFields} from "../../../auth-api/src-api/models/UserType/user-create-fields";
import {AuthService} from "../../../services/authService/auth.service";
import {Router} from "@angular/router";
import {slideFields, SliderComponent} from "../../components/slider/slider.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ConfirmDeleteDialogComponent} from "../../components/confirm-delete-dialog/confirm-delete-dialog.component";
import {AppLoaderComponent} from "../../components/app-loader/app-loader.component";
import {OtpAuthServiceService} from "../../../services/OTPServices/otp-auth-service.service";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
    SliderComponent,
    MatMenuModule,
    MatButton,
    MatFabButton,
    AppLoaderComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  slides: slideFields[] = [
    {
      backgroundCollapsed: '../../../assets/image/img_3.svg',
      backgroundExpanded: '../../../assets/image/img_3.svg',
      title: 'IT Development Company',
      description: 'Your partner for innovative solutions',
      textColor: "#fff",
    },
    {
      backgroundCollapsed: '../../../assets/image/img_2.svg',
      backgroundExpanded: '../../../assets/image/img_2.svg',
      title: 'Hosting and Maintenance',
      textColor: "#fff",
    },
    {
      backgroundCollapsed: '../../../assets/image/img_1.svg',
      backgroundExpanded: '../../../assets/image/img_1.svg',
      title: 'Web development',
      textColor: "#fff",
    },
    {
      backgroundCollapsed: '../../../assets/image/img.svg',
      backgroundExpanded: '../../../assets/image/img.svg',
      title: 'Mobile Development',
      textColor: "#fff",
    },
  ];
  constructor( private authService:AuthService,
               private otpService:OtpAuthServiceService,
               private router:Router,
               private dialog: MatDialog,) {

    this.otpMode = JSON.parse(sessionStorage.getItem('otpMode') as string )

    if (sessionStorage.getItem('connectedUser')){
      let authResponse = JSON.parse(sessionStorage.getItem('connectedUser') as string) ;
      this.person = authResponse.user;
    }

  }

  currentIndex = 0;
  otpMode:boolean = false;
  person: UserCreateFields = {phoneNumber: "", region: "", email: "", lastName:"fdfd", firstName: "dfdf", password: ""}

  openDialogPass() {
    this.dialog.open(ChangePasswordDialogComponent, {
      height: '60%',
      width: '50%',
      disableClose:false,
    });
  }
  openDialogEdit(person: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50%';
    dialogConfig.width = '25%';

    dialogConfig.data= {
      person: person,
    };

    this.dialog.open(EditDataDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(EditDataDialogComponent, dialogConfig);

    dialogRef.close();

  }

  logOut() {

    this.dialog.open(ConfirmDeleteDialogComponent, {
      disableClose:false,
      data:{
        message: "Are you sure you want to disconnect ?"
      }
    }).afterClosed().subscribe(value => {
      if (value=='oui'){
        if (this.otpMode){
          this.otpService.logout().subscribe(() => {
            sessionStorage.clear();
            this.router.navigate(['']);
          })
        }else {
          this.authService.disconect().subscribe(() => {
            sessionStorage.clear();
            this.router.navigate(['']);
          })
        }

      }
    });
  }

}
